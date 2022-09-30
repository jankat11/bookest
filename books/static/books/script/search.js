

document.addEventListener("DOMContentLoaded", () => {
    let thebook = document.querySelector("#searchHeader").dataset.bookinfo
    pagination = 0
    searchBook(thebook)
    .then((result) => {
        console.log(result)
        result ? document.querySelector("#moreResults").style.display = "block" : null
    })
})
