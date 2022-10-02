
document.querySelectorAll(".delete").forEach(button => {
    button.onclick = function() {
        if (confirm("Are you sure to delete your review?")) {
            let review = $(this).parent().parent()
            review.slideUp()
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
})