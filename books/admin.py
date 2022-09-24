from django.contrib import admin

from .models import User, Book, BookShelf, Review

# Register your models here.

admin.site.register(User)
admin.site.register(Book)
admin.site.register(BookShelf)
admin.site.register(Review)
