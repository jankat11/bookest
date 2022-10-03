
import requests

PAGINATION = 40

""" def check_amazon(isbn):
    headers = {'User-Agent': 'Mozilla 5.0'}
    url = f"https://www.amazon.com/dp/{str(isbn)}"
    res = requests.get(url, headers=headers)
    print("amazon book status: ", len(res.text))
    url2 = requests.get("https://www.google.com")
    print("google status: ", url2.status_code) """


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
        categories = ", ".join(response["volumeInfo"]["categories"])
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


""" def search_book(book, start_index=0):
    book = book.replace(" ", "+")
    url = f"https://www.googleapis.com/books/v1/volumes?q={book}&startIndex={start_index}&maxResults={PAGINATION}"
    response = requests.get(url)
    books = []
    try:
        for item in response.json()["items"]:
            try:
                isbn = item["volumeInfo"]["industryIdentifiers"][0]["identifier"]
                image = item["volumeInfo"]["imageLinks"]["thumbnail"]
                title = item["volumeInfo"]["title"]
                authors = ", ".join(item["volumeInfo"]["authors"])
                id = item["id"]
                the_book = {"isbn": isbn, "image": image,
                            "title": title, "authors": authors, "id": id}
                books.append(the_book)
            except:
                continue
    except(KeyError):
        return ""
    return books """
