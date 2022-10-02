
// remember theme if changed before and load it 
if (localStorage.getItem("status")) {
    let status = localStorage.getItem("status")
    status == "antique" ? turnAntique() : null
    document.body.style.display = "block"
} else {
    document.body.style.display = "block"
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

// shorten book title on home page
shortenTitle()

// fix nav-bar when scrolling
window.addEventListener('scroll', function () {
    console.log(topItems.offsetHeight)
    const section = document.querySelector("#blockBody")
    if (window.scrollY > 110) {
        topBar.classList.add('fixed-top');
        section.style.marginTop = "45px"
        menuItems.style.marginTop = window.scrollY - 65;
    } else {
        document.querySelector("#blockBody").style.marginTop = "0px"
        topBar.classList.remove('fixed-top');
        topItems.style.marginBottom = "0px";
        topBar.style.marginTop = "0px" 
        menuItems.style.marginTop = "0px"
    }
});

// text correction
if (description) {
    text = description.textContent
    description.innerHTML = text
}


// to load more results after page ends if clicked 
window.onclick = event => {
    console.log(event.target)
    if (event.target.id == "moreResults") {
        event.target.style.display = "none"
        pagination += adding + 1
        let bookInfo = event.target.dataset.bookinfo
        searchBook(bookInfo)
        .then((result) => {
            console.log(result)
            result["items"] ? document.querySelector("#moreResults").style.display = "block" : null
        })
    }
}





    

    
    
