from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api", views.api, name="api"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("book/<str:id>", views.book, name="book"),
    path("my_books", views.my_books, name="my_books"),
    path("my_reviews", views.my_reviews, name="my_reviews"),
    path("delete_review/<str:review_id>", views.delete_review, name="delete_review"),
    path("get_review/<str:ids>", views.get_review, name="get_review"),
    path("add_my_books/<str:ids>", views.add_my_books, name="add_my_books"),
    path("search/<str:book_info>", views.search, name="search"),
    path("remove_from_bookshelf/<str:book_id>", views.remove_from_bookshelf, name="remove"),
    #path("more_results/<str:result>", views.more_results, name="more_results"),
]