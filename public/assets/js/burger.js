document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
}); // chargement du DOM avant d'executer le code et appel de la fonction "initMobileMenu"

const toggleNavMobile = () => {
  //fonction fléchée qui gère l'ouverture et la fermeture du menu
  let navMobile = document.querySelector("nav > #nav"); // selectionne le menu de nav mobile
  let menuToggle = document.querySelector("#menu-toggle"); // selectionne le bouton
  let menuIcon = document.querySelector("#menu-toggle .icon i"); //selectionne l'icone dans le bouton

  navMobile.classList.toggle("active"); // affiche ou cache le menu

  const isExpanded = navMobile.classList.contains("active"); // verifie si le menu est ouvert
  menuToggle.setAttribute("aria-expanded", isExpanded); //mise a jour de l'accessibilité 'assistant vocaux'

  if (isExpanded) {
    menuIcon.classList.remove("fa-burger");
    menuIcon.classList.add("fa-xmark");
  } else {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-burger");
  } //changement de l'icone 'burger devient croix quand il s'ouvre et inversement'
};

const closeMenu = () => {
  let navMobile = document.querySelector("nav > #nav");
  let menuToggle = document.querySelector("#menu-toggle");
  let menuIcon = document.querySelector("#menu-toggle .icon i");

  navMobile.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuIcon.classList.remove("fa-xmark");
  menuIcon.classList.add("fa-burger");
}; // fonction qui ferme systematiquement le menu

function initMobileMenu() {
  //initialise le menu mobile appelé précédemment
  if (window.matchMedia("(max-width: 768px)").matches) {
    //verifie si l'ecran < ou = a 768px
    let toggleNav = document.querySelector("#menu-toggle");
    toggleNav.style.cursor = "pointer"; // selection du bouton menu et change curseur en pointeur
    toggleNav.addEventListener("click", toggleNavMobile); // ajout d un click pour appeler "toggleNavMobile"

    let main = document.querySelector("main");
    if (main) {
      main.addEventListener("click", closeMenu);
    } // si on clique dans le main, le menu se ferme

    let navLinks = document.querySelectorAll("nav > #nav > ul > li > a");
    navLinks.forEach((navLink) => {
      navLink.addEventListener("click", closeMenu);
    }); //si on clique sur un lien dans la nav, le menu se ferme aussi
  }

  window.addEventListener("resize", function () {
    //Ajoute un listener sur le redimensionnement de la fenêtre.
    if (!window.matchMedia("(max-width: 768px)").matches) {
      let navMobile = document.querySelector("nav > #nav");
      let menuToggle = document.querySelector("#menu-toggle");
      let menuIcon = document.querySelector("#menu-toggle .icon i");

      navMobile.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuIcon.className = "fa-solid fa-burger";
    } //si on passe a > ou = a 768px, le menu est réinitialisé" classe active retirée, aria expand à false et icone remise en burger
  });
}
