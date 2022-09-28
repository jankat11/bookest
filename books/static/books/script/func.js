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
    fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=LqUHIwL9cMprnPyH5reZJcaOH0In51Am`)
    .then(response => response.json())
    .then(result => {
        // isbn stands for 'The International Standard Book Number' a numeric commercial book identifier.
        for (let isbn of result["results"]["books"]) {
            isbn = isbn['isbns'][0]['isbn10']
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
            .then(response => response.json())
            .then(result => {
                let container = document.querySelector("#bestSeller")
                let image = result["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"]
                let isbn = result["items"][0]["volumeInfo"]["industryIdentifiers"][0]["identifier"]
                let title = result["items"][0]["volumeInfo"]["title"]
                let authors = result["items"][0]["volumeInfo"]["authors"].toString().replace(",", ", ")
                let id = result["items"][0]["id"]
                let book = { "isbn": isbn, "image": image, "title": title, "authors": authors, "id": id }
                let div = document.createElement("div")
                let lamp = theme.innerHTML == "antique" ? "lamp lampModern" : "lamp lampAntique"
                let candles = theme.innerHTML == "antique" ? '<span class="rounded-circle candles candlesModern candleLeft">🕯️</span><span class="rounded-circle candles candlesModern candleRight">🕯️</span>' : '<span class="rounded-circle candles candlesAntique candleLeft">🕯️</span><span class="rounded-circle candles candlesAntique candleRight">🕯️</span>'
                div.style.color = theme.innerHTML == "modern" ? "#fada9e" : "black"
                div.className = theme.innerHTML == "antique" ? "bookDiv bookDivModern" : "bookDiv bookDivAntique"
                div.setAttribute("data-isbn", book.isbn)
                div.setAttribute("data-id", book.id)
                div.innerHTML = `<div class="${lamp}">${candles}</div><h6 class="bookName">${book.title}</h6><img src="${book.image}" width="120" alt="no image"><h6 class="author">${book.authors}</h6>`
                container.append(div)
                div.onclick = () => {
                    let id = div.dataset.id
                    window.location.href = `/book/${id}`
                }
                enlightCandles()
            });
        }
    });
}


// enlight candles with onmouse event
function enlightCandles() {
    document.querySelectorAll(".bookDiv").forEach(book => {
        book.addEventListener("mousemove", () => lightCandle(book))
        book.addEventListener("mouseleave", () => darkCandle(book))
        window.addEventListener("unload", () => darkCandle(book))
    })
}


function darkCandle(book) {
    book.firstElementChild.firstElementChild.style.backgroundColor = "#f1efc700"
    book.firstElementChild.firstElementChild.style.boxShadow = "none"
    book.firstElementChild.lastElementChild.style.backgroundColor = "#f1efc700"
    book.firstElementChild.lastElementChild.style.boxShadow = "none" 
    book.style.backgroundImage = "linear-gradient(rgb(133, 77, 5), rgb(133, 77, 5))"
}

function lightCandle(book) { 
    book.firstElementChild.firstElementChild.style.backgroundColor = "#f1efc783"
    book.firstElementChild.firstElementChild.style.boxShadow = "0px 0px 30px 20px #f1efc791"
    book.firstElementChild.lastElementChild.style.backgroundColor = "#f1efc783"
    book.firstElementChild.lastElementChild.style.boxShadow = "0px 0px 30px 20px #f1efc791"
    book.style.backgroundImage = "linear-gradient(rgba(223, 172, 77, 0.938), rgb(133, 77, 5))"
}