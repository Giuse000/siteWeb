// ======================
// AOS
// ======================

window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

AOS.init({
    once: false,
    duration: 800,
});

// ======================
// LOGO
// ======================

const logo = document.getElementById("homeLogo");
const target = document.getElementById("logoTarget");

let startX, startY;
let endX, endY;

function calculatePositions() {

    // Centro dello schermo
    startX = window.innerWidth / 2;
    startY = window.innerHeight / 2;

    // Centro del punto finale
    const rect = target.getBoundingClientRect();
    endX = rect.left + rect.width / 2;
    endY = rect.top + rect.height / 2;
}

calculatePositions();

window.addEventListener("resize", calculatePositions);

function updateLogo() {

    const progress = Math.min(window.scrollY / 700, 1);

    const currentX = startX + (endX - startX) * progress;
    const currentY = startY + (endY - startY) * progress;

    const scale = 0.25 - progress * 0.23;

    logo.style.left = currentX + "px";
    logo.style.top = currentY + "px";
    logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener("load", updateLogo);
window.addEventListener("scroll", updateLogo);

// ======================
// MODALE
// ======================

function openModal() {
    document.getElementById("bookingModal").style.display = "block";
    document.getElementById("homeLogo").classList.add("modal-open");
}

function closeModal() {
    document.getElementById("bookingModal").style.display = "none";
    document.getElementById("homeLogo").classList.remove("modal-open");
}

window.addEventListener("click", function (e) {

    const modal = document.getElementById("bookingModal");

    if (e.target === modal) {
        closeModal();
    }

});

// ======================
// SWIPER
// ======================

const swiper = new Swiper(".my-carousel", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    loopedSlides: 20,
    grabCursor: true,
    speed: 600,

    autoplay: {
        delay: 1700,
        disableOnInteraction: false,
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        768: {
            slidesPerView: 2.5,
            loopedSlides: 20,
        },
        1024: {
            slidesPerView: 3.5,
            loopedSlides: 20,
        },
    },

    on: {
        setTranslate(swiper) {
            swiper.slides.forEach(slide => {
                const progress = slide.progress;
                const scale = 1 - Math.min(Math.abs(progress) * 0.25, 0.6);
                const opacity = 1 - Math.min(Math.abs(progress) * 0.6, 0.6);

                slide.style.transform = `scale(${scale})`;
                slide.style.opacity = opacity;
            });
        },

        setTransition(swiper, duration) {
            swiper.slides.forEach(slide => {
                slide.style.transition = `${duration}ms`;
            });
        },
    },
});

// ======================
// BORDI ANIMATI
// ======================

const elements = document.querySelectorAll(".animated-border");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }

    });

}, {
    threshold: 0.5
});

elements.forEach(el => observer.observe(el));