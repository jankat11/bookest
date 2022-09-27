let pagination = 0
const adding = 40

document.addEventListener("DOMContentLoaded", () => {

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

    // remember theme if changed before and load it 
    if (localStorage.getItem("status")) {
        let status = localStorage.getItem("status")
        if (status == "antique") {
            turnAntique()
        } else if (status == "modern")
            turnModern()
    }


    // active candles ligting effect
    if (theme.innerHTML == "modern") {
        enlightCandles()
    }



    // switch themes modern or antique
    theme.onclick = function () {
        if (theme.innerHTML == "antique") {
            turnAntique()
        } else if (theme.innerHTML == "modern") {
            turnModern()
        }
    }


    // redirect homepage clicking top items
    topItems.onclick = () => {
        window.location.href = "/"
    }


    // redirect book page clicking on book
    document.querySelectorAll(".bookDiv").forEach(book => {
        book.onclick = () => {
            let id = book.dataset.id
            window.location.href = `/book/${id}`
        }
    });


    // load fiction genre as default
    if (document.querySelector("#indexHeader")) {
        bestSellers("hardcover-fiction")
        bestSellers("trade-fiction-paperback")
    }


    // select genre from select menu to load index
    if (document.querySelector("#bookGenre")) {
        document.querySelector("#bookGenre").onchange = function () {
            document.querySelector("#bestSeller").innerHTML = ""
            if (this.value == "fiction") {
                bestSellers("hardcover-fiction")
                bestSellers("trade-fiction-paperback")
            } else if (this.value == "nonfiction") {
                bestSellers("hardcover-nonfiction")
                bestSellers("advice-how-to-and-miscellaneous")
                bestSellers("paperback-nonfiction")
            }
        }
    }


    // fix nav-bar when scrolling
    window.addEventListener('scroll', function () {
        if (window.scrollY > 165) {
            topBar.classList.add('fixed-top');
            document.querySelector("#blockBody").style.marginTop = "52px"
            menuItems.style.marginTop = window.scrollY - 110;
        } else {
            document.querySelector("#blockBody").style.marginTop = "0px"
            topBar.classList.remove('fixed-top');
            topItems.style.marginBottom = "0px";
            topBar.style.marginTop = "0px" 
            menuItems.style.marginTop = "0px"
        }
    });

    if (description) {
        text = description.textContent
        description.innerHTML = text
    }


    // to load more results after page ends if clicked 
    window.onclick = event => {
        console.log(event.target)
        if (event.target.id == "moreResults") {
            pagination += adding
            let bookInfo = event.target.dataset.bookinfo
            fetch(`/more_results/${bookInfo}loadsMore${pagination}`)
            .then(response => response.json())
            .then(result => {
                if (result.result == "") {
                    event.target.innerHTML = "no more results"
                    return
                }
                let container = document.querySelector("#container")
                for (let book of result.result) {
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
                }
                enlightCandles()
            });
        }
    }


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
            book.addEventListener("mousemove", () => {
                book.firstElementChild.firstElementChild.style.backgroundColor = "#f1efc783"
                book.firstElementChild.firstElementChild.style.boxShadow = "0px 0px 30px 20px #f1efc791"
                book.firstElementChild.lastElementChild.style.backgroundColor = "#f1efc783"
                book.firstElementChild.lastElementChild.style.boxShadow = "0px 0px 30px 20px #f1efc791"
            })
            book.addEventListener("mouseleave", () => {
                book.firstElementChild.firstElementChild.style.backgroundColor = "#f1efc700"
                book.firstElementChild.firstElementChild.style.boxShadow = "none"
                book.firstElementChild.lastElementChild.style.backgroundColor = "#f1efc700"
                book.firstElementChild.lastElementChild.style.boxShadow = "none"
            })
        })
    }


    //FUNCTIONS TO TOGGLE BETWEEN THEMES ANTIQUE/MODERN
    function turnAntique() {
        localStorage.setItem('status', "antique");
        document.querySelector("#menu").className = "navbar-toggler menuHistory mobile";
        topBar.style.backgroundColor = "#1f1000be"
        topBar.style.color = "#fcf5e7"
        topBar.style.boxShadow = "0px 1px 3px 1px rgba(247, 245, 131, 0.288)"
        topBar.className = "navbar navbar-dark"
        topItems.style.backgroundColor = "#dbe6ff46"
        bookIconModern.style.display = "none"
        bookIconHistory.style.display = "inline-block"
        title.style.color = "#fada9e"
        subTitle.style.color = "#fada9e"
        theme.innerHTML = "modern"
        theme.style.backgroundColor = "#fada9e"
        theme.style.color = "black"
        profile ? profile.style.backgroundColor = "#462303" : ""
        profile ? profile.style.color = "#fada9e" : ""
        document.querySelector("#submitLogin") ? document.querySelector("#submitLogin").className = "btn btn-warning loginButton" : ""
        document.querySelector("#submitRegister") ? document.querySelector("#submitRegister").className = "btn btn-warning loginButton" : ""
        if (document.querySelectorAll(".reviewItem")) {
            document.querySelectorAll(".reviewItem").forEach(item => {
                item.className = "reviewItem border border-warning rounded"
            })
        }
        document.querySelector(".topPıc") ? document.querySelector(".topPıc").className = "topPıcAntique" : null
        if (document.querySelector("#theShelf")) {
            document.querySelector("#theShelf").style.color = "#fada9e"
            document.querySelector("#topShelf").className = "readShelfAntique"
            document.querySelector("#bottomShelf").className = "readShelfAntique"
        } 
        document.querySelector("#searchButton").className = "btn btn-warning btn-sm"
        document.body.style.backgroundColor = "#462303"
        if(document.querySelectorAll(".bookSwitch")) {
            document.querySelectorAll(".bookSwitch").forEach(text => {
                text.style.color = "#fada9e"
            })
        }
        document.querySelectorAll(".candles").forEach(candle => {
            candle.style.display = "inline"
        })
        document.querySelector("#searchHeader") ? document.querySelector("#searchHeader").style.color = "#fada9e" : ""
        document.querySelector("#indexHeader") ? document.querySelector("#indexHeader").style.color = "#fada9e" : ""
        document.querySelector("#moreResults") ? document.querySelector("#moreResults").style.color = "#fada9e" : ""
        if (document.querySelectorAll(".bookDiv")) {
            document.querySelectorAll(".bookDiv").forEach(book => {
                book.className = "bookDiv bookDivAntique"
                book.style.color = "#fada9e"
            });
        }
        if (document.querySelectorAll(".lamp")) {
            document.querySelectorAll(".lamp").forEach(lamp => {
                lamp.className = "lamp lampAntique"
            });
        }
        if (document.querySelector("#bookGenre")) {
            document.querySelector("#bookGenre").className = "bookGenreAntique"
        }
        enlightCandles()
    }


    function turnModern() {
        localStorage.setItem('status', "modern");
        document.querySelector("#menu").className = "navbar-toggler menu mobile"
        bookIconModern.style.display = "inline-block"
        bookIconHistory.style.display = "none"
        title.style.color = "#584801"
        subTitle.style.color = "#584801"
        topBar.style.color = "black"
        topBar.style.boxShadow = "1px 1px 3px 1px rgba(131, 185, 247, 0.658)"
        topBar.style.backgroundColor = "#01807531"
        topBar.className = "navbar navbar-light"
        topItems.style.backgroundColor = "#e3eaff46"
        theme.innerHTML = "antique"
        theme.style.backgroundColor = "rgb(111, 111, 111)"
        theme.style.color = "white"
        profile ? profile.style.backgroundColor = "#02bbab31" : ""
        profile ? profile.style.color = "black" : ""
        document.querySelector(".topPıcAntique") ? document.querySelector(".topPıcAntique").className = "topPıc" : null
        document.querySelector("#submitLogin") ? document.querySelector("#submitLogin").className = "btn btn-primary loginButton" : ""
        document.querySelector("#submitRegister") ? document.querySelector("#submitRegister").className = "btn btn-primary loginButton" : ""
        if (document.querySelectorAll(".reviewItem")) {
            document.querySelectorAll(".reviewItem").forEach(item => {
                item.className = "reviewItem border border-dark rounded"
            })
        }
        if (document.querySelector("#theShelf")) {
            document.querySelector("#theShelf").style.color = "black"
            document.querySelector("#topShelf").className = "readShelfModern"
            document.querySelector("#bottomShelf").className = "readShelfModern"
        } 
        document.querySelector("#searchButton").className = "btn btn-dark btn-sm"
        document.body.style.backgroundColor = "white"
        document.querySelectorAll(".candles").forEach(candle => {
            candle.style.display = "none"
        })
        document.querySelector("#searchHeader") ? document.querySelector("#searchHeader").style.color = "black" : ""
        document.querySelector("#indexHeader") ? document.querySelector("#indexHeader").style.color = "black" : ""
        document.querySelector("#moreResults") ? document.querySelector("#moreResults").style.color = "black" : ""
        if(document.querySelectorAll(".bookSwitch")) {
            document.querySelectorAll(".bookSwitch").forEach(text => {
                text.style.color = "black"
            })
        }
        if (document.querySelectorAll(".bookDiv")) {
            document.querySelectorAll(".bookDiv").forEach(book => {
                book.className = "bookDiv bookDivModern"
                book.style.color = "black"
            });
        }
        if (document.querySelectorAll(".lamp")) {
            document.querySelectorAll(".lamp").forEach(lamp => {
                lamp.className = "lamp lampModern"
            });
        }
        if (document.querySelector("#bookGenre")) {
            document.querySelector("#bookGenre").className = "bookGenreModern"
        }
    }
});

