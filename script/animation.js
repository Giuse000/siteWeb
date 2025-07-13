document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animated");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show"); // Aggiunge la classe quando l'elemento entra nella viewport
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});
