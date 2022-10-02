
//FUNCTIONS TO TOGGLE BETWEEN THEMES ANTIQUE/MODERN

function turnAntique() {
    localStorage.setItem('status', "antique");
    document.querySelector("#menu").className = "navbar-toggler menuHistory mobile";
    topBar.style.backgroundColor = "#1f1000be"
    topBar.style.color = "#fcf5e7"
    topBar.style.boxShadow = "0px 1px 3px 1px rgba(247, 245, 131, 0.288)"
    topBar.className = "navbar navbar-dark"
    topItems.style.backgroundColor = "#9aa5bd00"
    topItems.style.boxShadow = "none"
    bookIconModern.style.display = "none"
    bookIconHistory.style.display = "inline-block"
    title.style.color = "#ffc46c"
    subTitle.style.color = "#f7e5b4"
    theme.innerHTML = "modern"
    theme.style.backgroundColor = "#fada9e"
    theme.style.border = "solid #b58327 2px"
    theme.style.color = "#856202"
    profile ? profile.style.backgroundColor = "#462303" : ""
    profile ? profile.style.color = "#fada9e" : ""
    document.querySelector("#reviewArea") ? document.querySelector("#reviewArea").style.backgroundColor = "#ffe7ac" : null
    document.querySelector("#menuItems").style.backgroundColor = "#ffe7ac"
    document.querySelector("#submitLogin") ? document.querySelector("#submitLogin").className = "btn btn-warning loginButton" : ""
    document.querySelector("#submitRegister") ? document.querySelector("#submitRegister").className = "btn btn-warning loginButton" : ""
    if (document.querySelectorAll(".reviewItem")) {
        document.querySelectorAll(".reviewItem").forEach(item => {
            item.className = "reviewItem border border-warning rounded"
        })
    }
    $(".topNavItem").addClass("topNavItemA")
    $(".topNavItemA").removeClass("topNavItem")
    document.querySelector(".searchInput") ? document.querySelector(".searchInput").className = "searchInputAntique" : null
    document.querySelector(".topPıc") ? document.querySelector(".topPıc").className = "topPıcAntique" : null
    if (document.querySelector("#theShelf")) {
        document.querySelector("#theShelf").style.color = "#fada9e"
        document.querySelector("#topShelf").className = "readShelfAntique"
        document.querySelector("#bottomShelf").className = "readShelfAntique"
    } 
    document.querySelector("#searchButton").className = "btn btn-warning btn-sm sbantique"
    document.body.style.backgroundColor = "#0e0a05"
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
            book.style.color = "#cea458"
            enlightCandles(book)
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
}


function turnModern() {
    localStorage.setItem('status', "modern");
    document.querySelector("#menu").className = "navbar-toggler menu mobile"
    bookIconModern.style.display = "inline-block"
    bookIconHistory.style.display = "none"
    title.style.color = "#4e4417"
    subTitle.style.color = "#3c361c"
    topBar.style.color = "black"
    topBar.style.boxShadow = "1px 1px 3px 1px rgba(131, 185, 247, 0.658)"
    topBar.style.backgroundColor = "#01807531"
    topBar.className = "navbar navbar-light"
    topItems.style.backgroundColor = "#9aa5bd47"
    topItems.style.boxShadow = "2px 2px 4px 1px #42668dc7"
    theme.innerHTML = "antique"
    theme.style.backgroundColor = "#3a3a3a95"
    theme.style.border = "none"
    theme.style.color = "white"
    profile ? profile.style.backgroundColor = "#02bbab31" : ""
    profile ? profile.style.color = "black" : ""
    $(".topNavItemA").addClass("topNavItem")
    $(".topNavItem").removeClass("topNavItemA")
    document.querySelector("#reviewArea") ? document.querySelector("#reviewArea").style.backgroundColor = "white" : null
    document.querySelector(".searchInputAntique") ? document.querySelector(".searchInputAntique").className = "searchInput" : null
    document.querySelector("#menuItems").style.backgroundColor = "whitesmoke"
    document.querySelector(".topPıcAntique") ? document.querySelector(".topPıcAntique").className = "topPıc" : null
    document.querySelector("#submitLogin") ? document.querySelector("#submitLogin").className = "btn btn-primary loginButton" : ""
    document.querySelector("#submitRegister") ? document.querySelector("#submitRegister").className = "btn btn-primary loginButton" : ""
    if (document.querySelectorAll(".reviewItem")) {
        document.querySelectorAll(".reviewItem").forEach(item => {
            item.className = "reviewItem border border-secondary rounded"
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