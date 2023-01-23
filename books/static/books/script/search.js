

document.addEventListener("DOMContentLoaded", () => {
    let thebook = document.querySelector("#searchHeader").dataset.bookinfo
    pagination = 0
    searchBook(thebook)
    .then(() => {
        document.querySelector("#spinnerIndex").style.display = "none"
    })
})
