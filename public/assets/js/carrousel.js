console.log("Script loaded!");
const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".carousel-dots");

const slidesData = [
  {
    title: "LIVRAISONS ÉLECTROMÉNAGERS",
    img: "/public/images/electro.jpg",
    text: "LIVREUR EN ÉLECTROMÉNAGERS : UN MÉTIER EXIGEANT À MULTIPLES FACETTES",
  },
  {
    title: "DÉMÉNAGEMENTS",
    img: "/public/images/demenagement.jpg",
    text: "DÉMÉNAGEUR : UN EXPERT EN OPTIMISATION SPATIALE ET LOGISTIQUE"
  },
  {
    title: "NETTOYAGES INDUSTRIELS",
    img: "/public/images/nettoyage.jpg",
    text: "NETTOYEUR INDUSTRIEL : SPÉCIALISTE DE L'ASSAINISSEMENT EN ENVIRONNEMENTS TECHNIQUES"
  },
  {
    title: "CONTACT GROSSISTES",
    img: "/public/images/fournisseurs.jpg",
    text: "MISE EN RELATION PROFESSIONNELLE POUR LE SECTEUR DU COMMERCE DE GROS"
  }
];

let currentIndex = 1;
let autoSlide;

// Générer les slides avec clones
function setupSlides() {
  const slides = [];

  // Clone last slide (pour début)
  const lastClone = createSlide(slidesData[slidesData.length - 1], "clone");
  track.appendChild(lastClone);

  slidesData.forEach((data) => {
    const slide = createSlide(data);
    track.appendChild(slide);
    slides.push(slide);
  });

  // Clone first slide (pour fin)
  const firstClone = createSlide(slidesData[0], "clone");
  track.appendChild(firstClone);

  // Centrer sur le vrai premier
  updateSlidePosition();

  // Créer les dots
  slidesData.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index + 1;
      updateSlidePosition();
      updateDots();
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function createSlide(data, className = "") {
  const slide = document.createElement("div");
  slide.classList.add("carousel-slide");
  if (className) slide.classList.add(className);
  slide.innerHTML = `
    <div class="container">
    <div class="title-banner">${data.title}</div>
      <div><img src="${data.img}" alt="Image ${data.title}" /></div>
      <div class="content">
        <p>${data.text}</p>
      </div>
<div class="card">
    <p><span>En savoir plus</span></p>
    <p><span>Nous contacter</span></p>
    <p><span>Qui sommes-nous</span></p>
</div>
      
    </div>`;
  return slide;
}

function updateSlidePosition() {
  const slideWidth = track.children[0].getBoundingClientRect().width;
  track.style.transition = "transform 0.6s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  const index = currentIndex - 1;
  dots[index % dots.length]?.classList.add("active");
}

function nextSlide() {
  if (currentIndex >= slidesData.length + 1) return;
  currentIndex++;
  updateSlidePosition();
  updateDots();
}

function prevSlide() {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateSlidePosition();
  updateDots();
}

track.addEventListener("transitionend", () => {
  const currentSlide = track.children[currentIndex];
  if (currentSlide.classList.contains("clone")) {
    // Désactiver transition immédiatement
    track.style.transition = "none";

    // Ajuster l’index (retour logique sans animation)
    if (currentIndex === 0) {
      currentIndex = slidesData.length;
    } else if (currentIndex === slidesData.length + 1) {
      currentIndex = 1;
    }

    // Forcer recalcul + re-transform sans transition
    const slideWidth = track.children[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    // Re-activer la transition sur le prochain frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.6s ease-in-out";
      });
    });
  }
});



function startAutoSlide() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 7000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Events
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

window.addEventListener("resize", () => {
  updateSlidePosition();
});


// Init
setupSlides();
startAutoSlide();
