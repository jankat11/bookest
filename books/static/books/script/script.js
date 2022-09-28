

document.addEventListener("DOMContentLoaded", () => {

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
        book.addEventListener("touchstart", () => {
            lightCandle(book)
            setTimeout(() => darkCandle(book), 3000)
        })
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
        const section = document.querySelector("#blockBody")
        if (window.scrollY > 150) {
            topBar.classList.add('fixed-top');
            section.style.marginTop = "45px"
            menuItems.style.marginTop = window.scrollY - 105;
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
});

