// Modale

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

// Allergeni Pop-up

document.querySelectorAll(".info-btn").forEach(button=>{

    button.addEventListener("click",function(e){

        e.stopPropagation();

        document.querySelectorAll(".allergen-popup").forEach(popup=>{

            if(popup!==this.nextElementSibling){

                popup.classList.remove("active");

            }

        });

        this.nextElementSibling.classList.toggle("active");

    });

});

document.addEventListener("click",()=>{

    document.querySelectorAll(".allergen-popup").forEach(popup=>{

        popup.classList.remove("active");

    });

});

// Up Button

document.addEventListener("DOMContentLoaded", () => {

    const scrollBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

