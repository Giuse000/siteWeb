// Inizializzazione AOS
AOS.init({
  offset: 170,
  duration: 800,
  once: false
});

//Scroll
function smoothScrollSlow(targetSelector, duration = 3000) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const startY = window.pageYOffset;
  const targetY = target.getBoundingClientRect().top + startY;
  const distance = targetY - startY;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    // progress in range 0-1
    const progress = Math.min(elapsed / duration, 1);

    // posizione attuale: calcolo linear (puoi sostituire con easing se vuoi)
    const currentY = startY + distance * progress;

    window.scrollTo(0, currentY);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

document.querySelectorAll('#sideMenu a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    closeMenu();

    const href = link.getAttribute('href');
    smoothScrollSlow(href, 1500);
  });
});



// SideMenu
  function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('active');
    document.getElementById('menuOverlay').classList.toggle('active');
  }

  function closeMenu() {
    document.getElementById('sideMenu').classList.remove('active');
    document.getElementById('menuOverlay').classList.remove('active');
  }

  // Chiudi anche cliccando su un link del menu
  document.querySelectorAll('#sideMenu a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); // evita lo scroll immediato

      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      closeMenu();

      // Aspetta che il menu si chiuda, poi fai lo scroll
      setTimeout(() => {
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400); // 400ms = durata della transizione del menu
    });
  });



// Logo dinamico
const logoContainer = document.getElementById("logo-container");
const title2 = document.getElementById("title2");
const section1 = document.getElementById("section1");
const button = document.querySelector(".prenota-btn"); // CORRETTO: era "elemento" ma usavi "button"

const initialLeft = 50;
const finalLeft = 6;
const initialTop = 9;
const finalTop = 10;
const maxScroll = 30;

function updateLogo() {
  const scrollY = window.scrollY;
  const ratio = Math.min(scrollY / maxScroll, 1);

  const currentLeft = initialLeft - (initialLeft - finalLeft) * ratio;
  const currentTop = initialTop - (initialTop - finalTop) * ratio;
  const scale = 1 - 0.2 * ratio;

  logoContainer.classList.remove("fixed");
  logoContainer.style.left = `${currentLeft}%`;
  logoContainer.style.top = `${currentTop}%`;
  logoContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;

  if (ratio >= 1) {
    logoContainer.classList.add("fixed");
    logoContainer.style.left = "3%";
    logoContainer.style.top = "1%";
    logoContainer.style.transform = "translate(0, 0) scale(0.8)";

    section1.style.borderWidth = "1px";
    section1.style.borderColor = "rgba(128, 128, 128, 0.245)";
    section1.style.borderBottomStyle = "solid";
    section1.style.position = "fixed";
    button.style.marginTop = "90vh";
  } else {
    section1.style.border = "none";
    section1.style.position = "static";
    button.style.marginTop = "80vh";
  }

  title2.style.opacity = ratio >= 0.05 ? "0" : "1";
}

window.addEventListener("scroll", updateLogo);
updateLogo();

// Modale
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
}


// Swiper
new Swiper('.my-carousel', {
  slidesPerView: 1.5,
  spaceBetween: 10,
  loop: true,
  loopedSlides: 3,            // importantissimo, almeno slidesPerView arrotondato
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  watchSlidesProgress: true,  // aiuta con le slide parziali e scaling
  watchSlidesVisibility: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: false,
  breakpoints: {
    768: {
      slidesPerView: 2.5,
      loopedSlides: 4
    },
    1024: {
      slidesPerView: 3.5,
      loopedSlides: 5
    }
  }
});

