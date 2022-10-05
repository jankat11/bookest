let pagination = 0
const adding = 40
const topBar = document.querySelector("#topBar")
const bookIconHistory = document.querySelector("#bookIconHistory")
const bookIconModern = document.querySelector("#bookIconModern")
const title = document.querySelector("#title")
const subTitle = document.querySelector("#subTitle")
const theme = document.querySelector("#change")
const topItems = document.querySelector("#topItems")
const menuItems = document.querySelector("#menuItems")
const profile = document.querySelector("#profile")
const description = document.querySelector("#desc")


function bestSellers(genre) {
    document.querySelector("#spinnerIndex").style.display = "inline-block"
    fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=LqUHIwL9cMprnPyH5reZJcaOH0In51Am`)
    .then(response => response.json())
    .then(result => {
        // isbn stands for 'The International Standard Book Number' a numeric commercial book identifier.
        let  promises = []
        for (let isbn of result["results"]["books"]) {
            isbn = isbn['isbns'][0]['isbn10']
            console.log(isbn)
            promises.push(parseBook(isbn))  
        }
        Promise.all(promises).then(() => {
            document.querySelector("#spinnerIndex").style.display = "none"
        })
    });
}


function searchBook(book) {
    pagination = arguments[1] ? arguments[1] : pagination
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&startIndex=${pagination}&maxResults=40`)
    .then(response => response.json())
    .then(books => {
        let container = document.querySelector("#container")
        books["items"] ?
        books["items"].forEach(book => {
            try {
                getBookItem(book, container)
            } catch (err) {
                console.log(err)
            }
        }) : null
        return books
    })
    .then((books) => {
        shortenTitle()
        !books["items"] ? document.querySelector("#moreResults").innerHTML = "no result" : 
        document.querySelector("#moreResults").innerHTML = "see more results"
        document.querySelector("#moreResults").style.display = "block"
        return books
    })
}


function parseBook(isbn) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then(response => response.json())
    .then(book => {
        getBookItem(book["items"][0])
    })
    .catch((err) => console.log(err))
}


function getBookItem(result) {
    let isbn;
    let container = arguments[1] ? arguments[1] : document.querySelector("#bestSeller") 
    let image = result["volumeInfo"]["imageLinks"] ? 
    result["volumeInfo"]["imageLinks"]["thumbnail"] : ""
    if (arguments[1] ) {
        isbn = result["volumeInfo"]["industryIdentifiers"] ?
        result["volumeInfo"]["industryIdentifiers"][0]["identifier"] : null
    } else {
        isbn = result["volumeInfo"]["industryIdentifiers"][0]["identifier"] 
    }
    let title = result["volumeInfo"]["title"]
    let authors = result["volumeInfo"]["authors"] ?
    result["volumeInfo"]["authors"].toString().replace(",", ", ") : ""
    let id = result["id"]
    let book = { "isbn": isbn, "image": image, "title": title, "authors": authors, "id": id }
    createBookElement(container, book)
} 


function createBookElement(container, book) {
    let div = document.createElement("div")
    div.style.display = "none"
    let lamp = theme.innerHTML == "antique" ? "lamp lampModern" : "lamp lampAntique"
    let candles = theme.innerHTML == "antique" ? '<span class="rounded-circle candles candlesModern candleLeft">🕯️</span><div class="candlesModern lightPlate"></div>' : '<span class="rounded-circle candles candlesAntique candleLeft">🕯️</span><div class="lightPlate"></div>'
    div.className = theme.innerHTML == "antique" ? "bookDiv bookDivModern" : "bookDiv bookDivAntique"
    div.setAttribute("data-isbn", book.isbn)
    div.setAttribute("data-id", book.id)
    div.innerHTML = `<div class="${lamp}">${candles}</div><h6 class="bookName"><span class="titleWrapp">${book.title}</span></h6><img class="bookCover" src="${book.image ? book.image : '/static/books/images/noimage.png'}" width="120" alt="no image"><h6 class="author">${book.authors}</h6>`
    container.append(div)
    div.style.display = "block"
    div.onclick = () => {
        let id = div.dataset.id
        window.location.href = `/book/${id}`
    }
    enlightCandles(div)
}


function shortenTitle() {
    document.querySelectorAll(".titleWrapp").forEach(title => {
        if (title.innerHTML.length > 36)
        title.innerHTML = title.innerHTML.slice(0, 35) + "..."
    })
    document.querySelectorAll(".author").forEach(author => {
        if (author.innerHTML.length > 51)
        author.innerHTML = author.innerHTML.slice(0, 50) + "..."
    })
}


function addMarginLastBook() {
    document.querySelectorAll(".bookDiv").forEach(function(book, index) {
        console.log(`${index}`,this.length)
    })
}


// enlight candles with onmouse event
function enlightCandles(book) {
    const candle = book.firstElementChild.firstElementChild
    book.addEventListener("mousemove", () => lightCandle(candle))
    book.addEventListener("mouseleave", () => darkCandle(candle))
    book.addEventListener("unload", () => darkCandle(candle))
}


function darkCandle(candle) {
    candle.style.backgroundColor = "#f1efc700"
    candle.style.boxShadow = "none"
    $(candle).next().fadeOut(1)
}

function lightCandle(candle) { 
    candle.style.backgroundColor = "#f1efc783"
    candle.style.boxShadow = "0px 0px 30px 20px #f1efc791"
    $(candle).next().fadeIn(95)
}

function defaultAddMenu() {
    document.querySelector("#removeBookShelfButton") ? 
    document.querySelector("#removeBookShelfButton").disabled = false : null
    document.querySelector("#addBookShelfButton") ?
    document.querySelector("#addBookShelfButton").disabled = false : null
    document.querySelector("#addspinner") ? 
    document.querySelector("#addspinner").style.display = "none" : null
}

function disabledAddMenu() {
    document.querySelector("#removeBookShelfButton") ? 
    document.querySelector("#removeBookShelfButton").disabled = true : null
    document.querySelector("#addBookShelfButton").disabled = true
    document.querySelector("#addspinner").style.display = "inline-block"
}
