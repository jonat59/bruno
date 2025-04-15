document.addEventListener("DOMContentLoaded", function () {
  //code s'exécute quand le HTML est entièrement chargé
  const options = {
    threshold: 0.3,
  }; //element visible des que la fenetre du navigateur est au moins a 30%

  const observer = new IntersectionObserver((entries) => {
    //liste des éléments observés et leur état d’intersection
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); //si vrai, alors visible
      } else {
        entry.target.classList.remove("visible"); //si faux, on la retire
      }
    });
  }, options);

  const fadeIns = document.querySelectorAll(".fade-in"); //elements qui doivent s'estomper
  const slideIns = document.querySelectorAll(".slide-in-left"); //elements qui glissent depuis la gauche

  fadeIns.forEach((el) => observer.observe(el)); //tous les .fade-in sont observés
  slideIns.forEach((el, index) => {
    //slide-in observés avec un décalage
    el.style.transitionDelay = `${index * 300}ms`;
    observer.observe(el);
  }); //effet en cascade lors du scroll avec un delai de transition croissante selon la position dans la liste
});
