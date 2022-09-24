
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    def __str__(self) -> str:
        return self.username


class Book(models.Model):
    title = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13)
    google_id = models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.title
    

class Review(models.Model):
    content = models.TextField(max_length=2500)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    on_book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")
    time = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "content": self.content,
            "owner": self.owner.username,
            "on_book": self.on_book.google_id,
            "time": self.time.strftime("%b %d %Y, %I:%M %p") 
        }


class BookShelf(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="book_shelf")
    will_be_read= models.ManyToManyField(Book, blank=True, related_name="as_will_be_read")
    has_been_read= models.ManyToManyField(Book, blank=True, related_name="as_has_been_read")

    def __str__(self) -> str:
        return f"{self.owner.username}'s bookshelf"