document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.getElementById('carouselTrack');
    const slides = Array.from(carouselTrack.children);
    
    // Rendi il carosello un loop infinito clonando la prima e l'ultima slide
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);

    carouselTrack.appendChild(firstSlideClone);
    carouselTrack.insertBefore(lastSlideClone, slides[0]);

    // Ricalcola le slide includendo i cloni
    const allSlides = Array.from(carouselTrack.children); 
    
    let currentIndex = 1; // Inizia dalla prima slide reale (indice 1 per via del clone iniziale)
    let startX = 0; // Posizione iniziale del touch/mouse
    let isDragging = false; // Flag per il trascinamento
    let currentTranslate = 0; // Posizione attuale del track durante il drag
    let prevTranslate = 0; // Posizione precedente per calcolare la differenza
    let autoSlideInterval; // Variabile per l'intervallo di scorrimento automatico

    // Inizializza la posizione per mostrare la prima slide reale
    // (quella all'indice 1, dato che allSlides[0] è il clone dell'ultima)
    const initialSlideWidth = allSlides[0].offsetWidth; // Larghezza di una slide (100vw)
    carouselTrack.style.transform = `translateX(${-currentIndex * initialSlideWidth}px)`;
    prevTranslate = -currentIndex * initialSlideWidth;


    // --- Funzioni di Utilità ---
    function setPositionByIndex(width) {
        currentTranslate = -currentIndex * (width || initialSlideWidth);
        prevTranslate = currentTranslate;
        carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function animateCarousel() {
        carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Gestisce il "salto" per il loop infinito quando la transizione è finita
    function handleTransitionEnd() {
        // Se siamo sulla slide clone finale, salta alla prima slide reale
        if (currentIndex === allSlides.length - 1) {
            carouselTrack.style.transition = 'none';
            currentIndex = 1; // La prima slide reale
            setPositionByIndex();
            setTimeout(() => { // Riattiva transizione dopo un breve ritardo
                carouselTrack.style.transition = 'transform 0.5s ease-out';
            }, 50);
        } 
        // Se siamo sulla slide clone iniziale, salta all'ultima slide reale
        else if (currentIndex === 0) {
            carouselTrack.style.transition = 'none';
            currentIndex = allSlides.length - 2; // L'ultima slide reale
            setPositionByIndex();
            setTimeout(() => { // Riattiva transizione dopo un breve ritardo
                carouselTrack.style.transition = 'transform 0.5s ease-out';
            }, 50);
        }
    }

    // --- Gestione Scorrimento Automatico ---
    function startAutoSlide() {
        // Avvia lo scorrimento automatico solo se non è già attivo
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(() => {
                currentIndex++;
                setPositionByIndex();
            }, 4000); // Scorre ogni 4 secondi
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }

    // Avvia lo scorrimento automatico all'inizio
    startAutoSlide();

    // --- Gestione Eventi Touch (per dispositivi mobili) ---
    carouselTrack.addEventListener('touchstart', (event) => {
        stopAutoSlide(); // Ferma lo scorrimento automatico al tocco
        isDragging = true;
        startX = event.touches[0].clientX;
        prevTranslate = currentTranslate;
        carouselTrack.style.transition = 'none'; // Rimuovi la transizione durante il drag
    });

    carouselTrack.addEventListener('touchmove', (event) => {
        if (!isDragging) return;
        event.preventDefault(); // Evita lo scorrimento della pagina
        const currentX = event.touches[0].clientX;
        const diffX = currentX - startX;
        currentTranslate = prevTranslate + diffX;
        animateCarousel();
    });

    carouselTrack.addEventListener('touchend', () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        const threshold = initialSlideWidth * 0.25; // Soglia per cambiare slide (es. 25% della larghezza)

        if (movedBy < -threshold) { // Swipe a sinistra
            currentIndex++;
        } else if (movedBy > threshold) { // Swipe a destra
            currentIndex--;
        }
        
        setPositionByIndex();
        carouselTrack.style.transition = 'transform 0.5s ease-out'; // Riattiva la transizione
    });

    // --- Gestione Eventi Mouse (per desktop/drag) ---
    carouselTrack.addEventListener('mousedown', (event) => {
        stopAutoSlide(); // Ferma lo scorrimento automatico al click del mouse
        isDragging = true;
        startX = event.clientX;
        prevTranslate = currentTranslate;
        carouselTrack.style.transition = 'none';
        carouselTrack.style.cursor = 'grabbing';
    });

    carouselTrack.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        event.preventDefault(); // Impedisce la selezione del testo
        const currentX = event.clientX;
        const diffX = currentX - startX;
        currentTranslate = prevTranslate + diffX;
        animateCarousel();
    });

    carouselTrack.addEventListener('mouseup', () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        const threshold = initialSlideWidth * 0.25;

        if (movedBy < -threshold) { // Drag a sinistra
            currentIndex++;
        } else if (movedBy > threshold) { // Drag a destra
            currentIndex--;
        }

        setPositionByIndex();
        carouselTrack.style.transition = 'transform 0.5s ease-out';
        carouselTrack.style.cursor = 'grab';
    });

    carouselTrack.addEventListener('mouseleave', () => {
        if (isDragging) { // Se il mouse esce mentre si trascina, termina il drag
            isDragging = false;
            setPositionByIndex();
            carouselTrack.style.transition = 'transform 0.5s ease-out';
            carouselTrack.style.cursor = 'grab';
        }
    });

    // Listener per la fine della transizione per gestire il loop
    carouselTrack.addEventListener('transitionend', handleTransitionEnd);

    // Gestione Ridimensionamento Finestra
    window.addEventListener('resize', () => {
        const newSlideWidth = allSlides[0].offsetWidth;
        carouselTrack.style.transition = 'none';
        setPositionByIndex(newSlideWidth); // Passa la nuova larghezza
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.5s ease-out';
        }, 50);
    });

    // Imposta il cursore predefinito per il drag
    carouselTrack.style.cursor = 'grab';
});