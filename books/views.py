from django.contrib import messages
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django import forms

from .util import search_book, get_book
from .models import User, Book, BookShelf, Review
# Create your views here.

class ReviewForm(forms.Form):
    review = forms.CharField(label="", 
        widget=forms.Textarea(attrs={'placeholder': 'Write your rewiew.', 'class': 'form-control', 
        'id': 'reviewArea', 'rows': 4}))

class SearchForm(forms.Form):
    book_info = forms.CharField(min_length=1, strip=True, label="", 
        widget=forms.TextInput(attrs={'placeholder': 'Search a Book or Author'}))


class LoginForm(forms.Form):
    username = forms.CharField(min_length=2, max_length=30, strip=True, label="",
        widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    password = forms.CharField(min_length=1, label="",
        widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))


class RegisterForm(forms.Form):
    username = forms.CharField(min_length=2, max_length=30, strip=True, label="",
        widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    email = forms.EmailField(min_length=2, max_length=30, label="",
        widget=forms.EmailInput(attrs={'placeholder': 'Email Address'}))
    password = forms.CharField(min_length=1, label="",
        widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
    confirm_password= forms.CharField(min_length=1, label="",
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password'}))


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
    try:
        books = search_book(book_info)
    except:
        return render(request, "books/index.html", {
            "message" : "No result",
            "form": SearchForm()
        })
    return render(request, "books/search.html", {
        "form": SearchForm(),
        "bookInfo": book_info,
        "books" : books,
        "message" : "Results:",
        "load" : "see more results" if books else ""
    })
        

def more_results(request, result):
    book_info = result.split("loadsMore")[0]
    result_count = result.split("loadsMore")[1]
    result = search_book(book_info, result_count)
    return JsonResponse({
        "result": result
    })


def book(request, id):
    reviews = ""
    book_info = get_book(id)
    try:
        book = Book.objects.get(google_id=id)
        reviews = book.reviews.all()
    except:
        pass
    return render(request, "books/book.html", {
        "form": SearchForm(),
        "id": id,
        "book": book_info,
        "reviews": reviews,
        "reviewForm": ReviewForm()
    })


@login_required
def my_reviews(request):
    user = request.user
    reviews = user.reviews.all()
    return render(request, "books/myReviews.html", {
        "form": SearchForm(),
        "reviews": reviews
    })

@login_required
def my_books(request):
    try:
        book_shelf = BookShelf.objects.get(owner=request.user)
        will_be_read = [book.google_id for book in book_shelf.will_be_read.all()]
        has_been_read = [book.google_id for book in book_shelf.has_been_read.all()]
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
        if Book.objects.filter(google_id=google_id).all().count() == 0:
            Book.objects.create(google_id=google_id, isbn=isbn, title=title)
        if BookShelf.objects.filter(owner=request.user).all().count() == 0:
            BookShelf.objects.create(owner=request.user)
        book = Book.objects.get(google_id=google_id)
        book_shelf = BookShelf.objects.get(owner=request.user)
        if request.POST["checkbox"] == "will_be_read":
            try:
                check = book_shelf.will_be_read.get(id=book.id)
                if check is not None:
                    messages.info(request, "❗ the book already exist in 'will be read' shelf")
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
                    messages.info(request, "❗ the book already exist in 'has been read' shelf")
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
    messages.info(request, "✔️ Successfully added to your library")
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
        messages.info(request, "✔️ your review successfully added")
        return HttpResponseRedirect(f"/book/{google_id}")


@login_required
def delete_review(request, review_id):
    review = Review.objects.get(id=int(review_id))
    if request.user == review.owner:
        review.delete()
    return JsonResponse({
        "success": "the review deleted successfully"
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