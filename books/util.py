
import requests

PAGINATION = 40

def get_book(id):
    url = f"https://www.googleapis.com/books/v1/volumes/{id}"
    response = requests.get(url).json()
    title = response["volumeInfo"]["title"]
    google_id = response["id"]
    try:
        author = ", ".join(response["volumeInfo"]["authors"])
    except:
        author = "no author info"
    try:
        google_books = response["volumeInfo"]["previewLink"]
    except:
        google_books = ""
    try:
        isbn = response["volumeInfo"]["industryIdentifiers"][0]["identifier"]
    except:
        isbn = ""
    try:
        image = response["volumeInfo"]["imageLinks"]["thumbnail"]
    except:
        image = ""
    try:
        description = response["volumeInfo"]["description"]
    except:
        description = ""
    try:
        date = response["volumeInfo"]["publishedDate"]
    except:
        date = ""
    try:
        page_count = response["volumeInfo"]["pageCount"]
    except:
        page_count = ""
    try:
        categories = " ".join(response["volumeInfo"]["categories"]).split("/")
        categories = (" / ").join(set([cat.lower().strip() for cat in categories]))
    except:
        categories = ""
    return {
        "title": title if title else "", 
        "image": image if image else "", 
        "author": author if author else "", 
        "description": description if description else "", 
        "publishedDate": date if date else "",
        "pageCount": page_count if page_count else "",
        "categories": categories if categories else "",
        "isbn": isbn,
        "googleBooks": google_books,
        "google_id": google_id
    }

