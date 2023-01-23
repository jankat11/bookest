
// adjust collapse menu position when page load
document.addEventListener("DOMContentLoaded", () => {
    menuItems.style.top = String(110 + topBar.offsetHeight + 2) + "px"
})


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
    const section = document.querySelector("#blockBody")
    $("#navbarToggleExternalContent").collapse("hide")
    if (window.scrollY > 110) {
        topBar.classList.add('fixed-top');
        section.style.marginTop = (2 + topBar.offsetHeight) + "px"
        menuItems.style.top = topBar.offsetHeight + 2;
        menuItems.style.position = "fixed";
        
    } else {
        document.querySelector("#blockBody").style.marginTop = "0px"
        topBar.classList.remove('fixed-top');
        topItems.style.marginBottom = "0px";
        topBar.style.marginTop = "0px" 
        menuItems.style.position = "absolute"
        menuItems.style.top = 110 + topBar.offsetHeight + 2
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
        event.target.innerHTML = '<img id="spinnerIndex" src="/static/books/images/spinner.gif" alt="asd" width="30" height="30">'
        pagination += adding + 1
        let bookInfo = event.target.dataset.bookinfo
        searchBook(bookInfo)
    }
}

// switch icon clicking triggers theme change
$("#arrow").click(function() {
    this.nextElementSibling.click()
})

window.onpageshow = function(event) {
    if (event.persisted) {
        defaultAddMenu()
    }
};

    
