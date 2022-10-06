
(function() {
    document.querySelector("#buttonStatus").dataset.status == "False" ?
    document.querySelector("#removeBookShelfButton").disabled = true :
    document.querySelector("#removeBookShelfButton").disabled = false
})()


document.getElementById("addBookForm").onsubmit = function(event) {
    if (this.dataset.login === "False") {
        event.preventDefault()
        document.location.href = "/login"
    }  
    let unChecked = 0
    document.querySelectorAll(".checkbox").forEach(checkbox => {
        checkbox.checked == false ? unChecked++ : null
    })
    if (unChecked == 2) {
        event.preventDefault()
    } else {
        document.querySelector("#buttonStatus").setAttribute("data-status","True")
        disabledAddMenu()
    } 
} 


document.querySelectorAll(".checkbox").forEach(checkbox => {
    let status = checkbox.checked
    checkbox.onclick = () => {
        if (status) {
            checkbox.checked = false
        } else if (!status) {
            document.querySelectorAll(".checkbox").forEach(checkbox => {
                checkbox.checked = false
            })
            checkbox.checked = true
        }
    }
});

if(document.querySelector("#reviewForm")) {
    document.querySelector("#reviewForm").addEventListener("submit", event => {
        if (!document.querySelector("#reviewArea").value) {
            alert("You must not send empty review!")
            event.preventDefault()
        }
    })

    document.querySelectorAll(".delete").forEach(button => {
        button.onclick = function() {
            if (confirm("Are you sure to delete your note?")) {
                let review = $(this).parent().parent().parent()
                $(review).slideUp()
                fetch(`/delete_review/${this.id}`)
                .then(response => response.json())
                .then(result => {
                    console.log(result.success)
                });
            }
        }
    });

    document.querySelectorAll(".reviewContent").forEach(review => {
        text = review.textContent
        review.innerHTML = text
    });
}


if(document.querySelector("#removeBookShelfButton")) {
    document.querySelector("#removeBookShelfButton").onclick = function() {
        const spinner = document.querySelector("#rmspinner")
        const wrap = document.querySelector("#buttonWrapper")
        if(confirm("Are you sure to remove this book from your bookshelf")) {
            spinner.style.display = "inline-block"
            document.querySelector("#addBookShelfButton").disabled = true
            this.disabled = true
            document.querySelector("#buttonStatus").setAttribute("data-status","False")
            fetch(`/remove_from_bookshelf/${this.dataset.book}`)
            .then(response => response.json())
            .then(result => {
                document.querySelector("#addBookShelfButton").disabled = false
                console.log(result)
                spinner.style.top = "1px"
                spinner.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; bottom: 4px" width="27" height="27" fill="#3b9ea3f0" class="bi bi-check" viewBox="0 0 16 16">' +
                '<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>' +
              '</svg>' 
            })
        }
    }
}

document.querySelector(".addedSuccesful") ?
document.querySelector(".addedSuccesful").firstElementChild.innerHTML = 
'<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="#3b9ea3f0" class="bi bi-check" viewBox="0 0 16 16">' +
'<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>' +
'</svg>' + "your note successfully added" : null

