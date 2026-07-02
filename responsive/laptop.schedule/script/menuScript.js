function openModal() {
    document.getElementById("bookingModal").style.display = "block";
}

function closeModal() {
    document.getElementById("bookingModal").style.display = "none";
}

window.addEventListener("click", function (e) {

    const modal = document.getElementById("bookingModal");

    if (e.target === modal) {
        closeModal();
    }

});