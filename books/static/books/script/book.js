
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
        document.querySelector("#removeBookShelfButton") ? 
        document.querySelector("#removeBookShelfButton").disabled = true : null
        document.querySelector("#addBookShelfButton").disabled = true
        document.querySelector("#addspinner").style.display = "inline-block"
        setTimeout(() => {
            document.querySelector("#removeBookShelfButton") ? 
            document.querySelector("#removeBookShelfButton").disabled = false : null
            document.querySelector("#addBookShelfButton").disabled = false
            document.querySelector("#addspinner").style.display = "none"
        }, 3000)            
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

document.querySelector("#reviewForm").addEventListener("submit", event => {
    if (!document.querySelector("#reviewArea").value) {
        alert("You must not send empty review!")
        event.preventDefault()
    }
})

document.querySelectorAll(".delete").forEach(button => {
    button.onclick = function() {
        if (confirm("Are you sure to delete your review?")) {
            fetch(`/delete_review/${this.id}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.success)
                let review = this.parentElement.parentElement
                review.style.animationPlayState = 'running';
                review.addEventListener('animationend', () => {
                    review.remove();
                });
            });
        }
    }
});

document.querySelectorAll(".reviewContent").forEach(review => {
    text = review.textContent
    review.innerHTML = text
});

if(document.querySelector("#removeBookShelfButton")) {
    document.querySelector("#removeBookShelfButton").onclick = function() {
        const spinner = document.querySelector("#rmspinner")
        const wrap = document.querySelector("#buttonWrapper")
        if(confirm("Are you sure to remove this book from your bookshelf")) {
            spinner.style.display = "inline-block"
            document.querySelector("#addBookShelfButton").disabled = true
            this.disabled = true
            fetch(`/remove_from_bookshelf/${this.dataset.book}`)
            .then(response => response.json())
            .then(result => {
                document.querySelector("#addBookShelfButton").disabled = false
                console.log(result)
                spinner.innerHTML = "✔️"
                spinner.style.top = "1px"
                wrap.innerHTML = "book removed"
            })
        }
    }
}


