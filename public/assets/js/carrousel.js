const track = document.querySelector(".carousel-track"); //selection du conteneur pour defiler les slides horizontalement
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev"); //selection des boutons prev et next
const dotsContainer = document.querySelector(".carousel-dots"); //selection des points du carrousel

const slidesData = [
  //mise en place d un tableau avec title, img, text et le bouton 3 cartes
  {
    title: "LIVRAISONS ÉLECTROMÉNAGERS",
    img: "/public/images/electro.jpg",
    text: "LIVREUR EN ÉLECTROMÉNAGERS : UN MÉTIER EXIGEANT À MULTIPLES FACETTES",
    cardLinks: [
      { text: "En savoir plus", href: "/livraison.html" },
      { text: "Nous contacter", href: "/contact.html" },
      { text: "Qui sommes-nous", href: "/a-propos.html" },
    ],
  },
  {
    title: "DÉMÉNAGEMENTS",
    img: "/public/images/demenagement.jpg",
    text: "DÉMÉNAGEUR : UN EXPERT EN OPTIMISATION SPATIALE ET LOGISTIQUE",
    cardLinks: [
      { text: "En savoir plus", href: "/demenagement.html" },
      { text: "Nous contacter", href: "/contact.html" },
      { text: "Qui sommes-nous", href: "/a-propos.html" },
    ],
  },
  {
    title: "NETTOYAGES INDUSTRIELS",
    img: "/public/images/nettoyage.jpg",
    text: "NETTOYEUR INDUSTRIEL : SPÉCIALISTE DE L'ASSAINISSEMENT EN ENVIRONNEMENTS TECHNIQUES",
    cardLinks: [
      { text: "En savoir plus", href: "/nettoyage.html" },
      { text: "Nous contacter", href: "/contact.html" },
      { text: "Qui sommes-nous", href: "/a-propos.html" },
    ],
  },
  {
    title: "CONTACT GROSSISTES",
    img: "/public/images/fournisseurs.jpg",
    text: "MISE EN RELATION PROFESSIONNELLE POUR LE SECTEUR DU COMMERCE DE GROS",
    cardLinks: [
      { text: "En savoir plus", href: "/fournisseur.html" },
      { text: "Nous contacter", href: "/contact.html" },
      { text: "Qui sommes-nous", href: "/a-propos.html" },
    ],
  },
];

let currentIndex = 1; // commencer a l'index 1 pour cloner 'faire une boucle infinie"
let autoSlide;

function setupSlides() {
  const slides = [];
  const lastClone = createSlide(slidesData[slidesData.length - 1], "clone");
  track.appendChild(lastClone); // creer un clone de la derniere slide

  slidesData.forEach((data) => {
    const slide = createSlide(data);
    track.appendChild(slide);
    slides.push(slide);
  }); //génére tous les slides

  const firstClone = createSlide(slidesData[0], "clone");
  track.appendChild(firstClone);

  updateSlidePosition(); //creer un clone de la premiere slide ajoutée a la fin

  slidesData.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active"); //centre le carrousel sur la premiere vraie slide
    dot.addEventListener("click", () => {
      currentIndex = index + 1;
      updateSlidePosition();
      updateDots();
      resetAutoSlide();
    }); //generation de points de navigation
    dotsContainer.appendChild(dot);
  });
}

function createSlide(data, className = "") {
  const slide = document.createElement("div");
  slide.classList.add("carousel-slide");
  if (className) slide.classList.add(className);
  const cardsHTML = data.cardLinks
    .map(
      (link) => `
    <a class="card-link" href="${link.href}">
      <span>${link.text}</span>
    </a>
  `
    )
    .join("");

  slide.innerHTML = `
    <div class="container">
    <div class="title-banner">${data.title}</div>
      <div><img src="${data.img}" alt="Image ${data.title}" /></div>
      <div class="content">
        <p>${data.text}</p>
      </div>
<div class="card">
${cardsHTML}
</div>
      
    </div>`;
  return slide;
} //creation dynamique d une slide incluant titre, image, texte et boutons avec liens

function updateSlidePosition() {
  const slideWidth = track.children[0].getBoundingClientRect().width; //calcule la largeur d une slide
  track.style.transition = "transform 0.6s ease-in-out"; //utilise une transition fluide
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`; //translate le track horizontalement pour montrer la slide actuelle
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("active"));
  const index = currentIndex - 1; //correction de l'index a cause du clonage
  dots[index % dots.length]?.classList.add("active");
} //activation des points 'dots' en fonction de current index

function nextSlide() {
  if (currentIndex >= slidesData.length + 1) return;
  currentIndex++; //incrémentation ou décrémentation de 'curentIndex'
  updateSlidePosition();
  updateDots(); //appel des fonctions
}

function prevSlide() {
  if (currentIndex <= 0) return;
  currentIndex--; //incrémentation ou décrémentation de 'curentIndex'
  updateSlidePosition();
  updateDots(); //appel des fonctions
}

track.addEventListener("transitionend", () => {
  // quand une transition se termine
  const currentSlide = track.children[currentIndex];
  if (currentSlide.classList.contains("clone")) {
    //si la slide est visible
    track.style.transition = "none"; // Désactiver transition immédiatement

    if (currentIndex === 0) {
      currentIndex = slidesData.length;
    } else if (currentIndex === slidesData.length + 1) {
      currentIndex = 1;
    } // Ajuster l’index (retour logique sans animation)

    const slideWidth = track.children[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`; // Forcer recalcul + re-transform sans transition;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.6s ease-in-out";
      });
    }); // Re-activer la transition sur le prochain frame
  }
});

function startAutoSlide() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 7000);
} //slide toutes les 7 secondes

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
} //si on clique sur une flèche ou un point'dot' redemarrage des 7 secondes

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
}); //navigation via des flèches

window.addEventListener("resize", () => {
  updateSlidePosition();
}); // mise a jour de la position si la fenetre est redimensionnée(responsivité)

setupSlides(); // genere des slides
startAutoSlide(); // lancement automatique du carrousel
