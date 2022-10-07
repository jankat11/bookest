
from django.contrib import messages
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError

from .util import get_book
from .models import  User, Book, BookShelf, Review
from .forms import ReviewForm, SearchForm, LoginForm, RegisterForm
# Create your views here.


def index(request):
    if request.method == "POST":
        form = SearchForm(request.POST)
        if form.is_valid():
            book_info = form.cleaned_data["book_info"]
            return HttpResponseRedirect(f"/search/{book_info}")
        else:
            return HttpResponseRedirect(reverse("index"))
    return render(request, "books/index.html", {
        "form": SearchForm(),
    })


def search(request, book_info):

    return render(request, "books/search.html", {
        "form": SearchForm(),
        "bookInfo": book_info,
        "message": "Results:",
        "load": "see more results"
    })


def book(request, id):
    reviews = ""
    exist_in_shelf = False
    book = None
    book_info = get_book(id)
    try:
        book = Book.objects.get(google_id=id)
        book_shelf = BookShelf.objects.get(owner=request.user)
        reviews = sorted([review.serialize() for review in book.reviews.all().filter(
            owner=request.user)], key=lambda review: review["time"], reverse=True)
        try:
            book_shelf = BookShelf.objects.get(owner=request.user)
            exist_in_shelf = bool(book_shelf.has_been_read.get(id=book.id))
        except:
            pass
        try:
            book_shelf = BookShelf.objects.get(owner=request.user)
            exist_in_shelf = bool(book_shelf.will_be_read.get(id=book.id))
        except:
            pass
    except:
        pass
    return render(request, "books/book.html", {
        "form": SearchForm(),
        "id": id,
        "book": book_info,
        "reviews": reviews,
        "reviewForm": ReviewForm(),
        "exist": exist_in_shelf,
        "bookId": book.id if book else ""
    })


@login_required
def my_reviews(request):
    user = request.user
    reviews = sorted(user.reviews.all(),
                     key=lambda review: review.time, reverse=True)
    reviews_serialized = [review.serialize() for review in reviews]
    return render(request, "books/myReviews.html", {
        "form": SearchForm(),
        "reviews": reviews_serialized
    })


@login_required
def my_books(request):
    try:
        book_shelf = BookShelf.objects.get(owner=request.user)
        will_be_read = [{"id": book.book.google_id, "cover": book.book.no_cover, "title": book.book.title[0:10]}
                        for book in book_shelf.orderwillberead_set.all().order_by("date_time")]
        has_been_read = [{"id": book.book.google_id, "cover": book.book.no_cover, "title": book.book.title[0:10]}
                         for book in book_shelf.orderhasbeenread_set.all().order_by("date_time")]
        return render(request, "books/myBooks.html", {
            "form": SearchForm(),
            "has_been_read": has_been_read,
            "will_be_read": will_be_read,
            "message": ""
        })
    except:
        return render(request, "books/myBooks.html", {
            "form": SearchForm(),
            "message": ""
        })


@login_required
def add_my_books(request, ids):
    if request.method == "POST":
        google_id = ids.split("---")[0]
        isbn = ids.split("---")[1]
        title = ids.split("---")[2]
        cover_status = request.POST["no_cover"] == "no cover"
        if Book.objects.filter(google_id=google_id).all().count() == 0:
            Book.objects.create(google_id=google_id, isbn=isbn,
                                title=title, no_cover=cover_status)
        if BookShelf.objects.filter(owner=request.user).all().count() == 0:
            BookShelf.objects.create(owner=request.user)
        book = Book.objects.get(google_id=google_id)
        book_shelf = BookShelf.objects.get(owner=request.user)

        if request.POST["checkbox"] == "will_be_read":
            try:
                check = book_shelf.will_be_read.get(id=book.id)
                if check is not None:
                    messages.warning(request, check.google_id)
                    messages.info(
                        request, "This book is already in 'will be read' shelf")
                    return HttpResponseRedirect(reverse("my_books"))
            except:
                pass
            try:
                check = book_shelf.has_been_read.get(id=book.id)
                if check is not None:
                    book_shelf.has_been_read.remove(book)
                    book_shelf.save()
            except:
                pass
            book_shelf.will_be_read.add(book)
            book_shelf.save()
        elif request.POST["checkbox"] == "has_been_read":
            try:
                check = book_shelf.has_been_read.get(id=book.id)
                if check is not None:
                    messages.warning(request, check.google_id)
                    messages.info(
                        request, "This book is already in 'has been read' shelf")
                    return HttpResponseRedirect(reverse("my_books"))
            except:
                pass
            try:
                check = book_shelf.will_be_read.get(id=book.id)
                if check is not None:
                    book_shelf.will_be_read.remove(book)
                    book_shelf.save()
            except:
                pass
            book_shelf.has_been_read.add(book)
            book_shelf.save()
    messages.info(request, "Successfully added to bookshelf")
    return HttpResponseRedirect(reverse("my_books"))


@login_required
def get_review(request, ids):
    if request.method == "POST":
        google_id = ids.split("---")[0]
        isbn = ids.split("---")[1]
        title = ids.split("---")[2]
        if Book.objects.filter(google_id=google_id).all().count() == 0:
            Book.objects.create(google_id=google_id, isbn=isbn, title=title)
        book = Book.objects.get(google_id=google_id)
        user = request.user
        content = request.POST["review"].replace("\n", "<br>")
        Review.objects.create(owner=user, on_book=book, content=content)
        messages.info(request,  "your note was successfully added")
        return HttpResponseRedirect(f"/book/{google_id}")


@login_required
def delete_review(request, review_id):
    review = Review.objects.get(id=int(review_id))
    if request.user == review.owner:
        review.delete()
    return JsonResponse({
        "success": "the review deleted successfully"
    })


@login_required
def remove_from_bookshelf(request, book_id):
    book_shelf = BookShelf.objects.get(owner=request.user)
    book = Book.objects.get(pk=book_id)
    try:
        book_shelf.will_be_read.remove(book)
    except:
        pass
    try:
        book_shelf.has_been_read.remove(book)
    except:
        pass
    return JsonResponse({
        "success": "the book removed successfully"
    })


def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        try:
            user = authenticate(request, username=username, password=password)
        except:
            return render(request, "books/login.html", {
                "message": "An error occured, please try again.",
                "form": SearchForm(),
                "loginForm": LoginForm()
            })

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "books/login.html", {
                "message": "Invalid username and/or password.",
                "form": SearchForm(),
                "loginForm": LoginForm()
            })
    else:
        return render(request, "books/login.html", {
            "form": SearchForm(),
            "loginForm": LoginForm()
        })


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        confirm_password = request.POST["confirm_password"]
        email = request.POST["email"]

        if not username.isalnum():
            return render(request, "books/register.html", {
                "message": "Please enter your username without special character.",
                "form": SearchForm(),
                "registerForm": RegisterForm()
            })

        if password == "":
            return render(request, "books/register.html", {
                "message": "Please fill requirements!",
                "form": SearchForm(),
                "registerForm": RegisterForm()
            })

        if password.find("{") != -1 or password.find("}") != -1 or password.find(";") != -1:
            return render(request, "books/register.html", {
                "message": "Forbidden Character in Password!",
                "form": SearchForm(),
                "registerForm": RegisterForm()
            })

        if password != confirm_password:
            return render(request, "books/register.html", {
                "message": "Passwords do not match!",
                "form": SearchForm(),
                "registerForm": RegisterForm()
            })

        if email == "":
            return render(request, "books/register.html", {
                "message": "Please fill requirements!",
                "form": SearchForm(),
                "registerForm": RegisterForm()
            })

        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "books/register.html", {
                "message": "This username already exist, please choose another.",
                "form": SearchForm(),
                "registerForm": RegisterForm()
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "books/register.html", {
            "form": SearchForm(),
            "registerForm": RegisterForm()
        })
