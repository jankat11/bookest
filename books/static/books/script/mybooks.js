
let messages = document.querySelector(".messages")
const check = '<svg style="position: relative; bottom: 1px" xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="#3b9ea3f0" class="bi bi-check" viewBox="0 0 16 16">' +
'<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>' +
'</svg>' + "Successfully added to bookshelf"
const exclamation = '<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; bottom: 1px; right: 2px;" width="22" height="17" fill="red" class="bi bi-exclamation-lg" viewBox="0 0 16 16">' +
'<path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>' +
'</svg>'


document.querySelectorAll(".bookOnTheShelf").forEach(book => {
    book.onclick = () => {
        window.location.href = `/book/${book.id}`
    }
});

if (messages) {
    let message = messages.firstElementChild.innerHTML
    message.slice(0, 1) == "S" ? 
    messages.firstElementChild.innerHTML = check :
    messages.firstElementChild.innerHTML = "".concat(exclamation, message)
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#secret")) {
        document.querySelectorAll(".bookOnTheShelf").forEach(book => {
            if (book.id == document.querySelector("#secret").value) {
                book.firstElementChild.classList.add("already")
            }
        })
    }
})