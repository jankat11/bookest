from django.contrib import admin

from .models import User, Book, BookShelf, Review, OrderWillBeRead, OrderHasBeenRead

# Register your models here.

admin.site.register(User)
admin.site.register(Book)
admin.site.register(BookShelf)
admin.site.register(Review)
admin.site.register(OrderWillBeRead)
admin.site.register(OrderHasBeenRead)
