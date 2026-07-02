// SideMenu
  function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('active');
    document.getElementById('menuOverlay').classList.toggle('active');
  }

  function closeMenu() {
    document.getElementById('sideMenu').classList.remove('active');
    document.getElementById('menuOverlay').classList.remove('active');
  }

// Logo dinamico
const logoContainer = document.getElementById("logoContainer");
const section1 = document.getElementById("navbar");

const initialLeft = 50;
const finalLeft = 15;

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
  } else {
    section1.style.border = "none";
    section1.style.position = "static";
  }
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

const modal = document.getElementById("myModal");

modal.addEventListener("click", function (e) {
    if (e.target === this) {
        closeModal();
    }
});

//Scroll
document.querySelectorAll('#sideMenu a').forEach(link => {
  link.addEventListener('click', function(e) {

    const href = this.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      closeMenu();

      setTimeout(() => {
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  });
});