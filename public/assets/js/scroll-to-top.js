document.addEventListener("DOMContentLoaded", function () {
  //script exécuté quand page prête pour éviter d’interagir avec des éléments encore non chargés
  const backToTopButton = document.getElementById("backToTop");
  //selection du bouton backToTop

  window.addEventListener("scroll", function () {
    //verification a chaque scroll
    if (window.scrollY > 100) {
      backToTopButton.classList.add("visible"); //bouton visible a partir de 100px

      if (window.scrollY > 700) {
        backToTopButton.classList.add("pulse"); //pulsation du bouton a partir de 700px
      } else {
        backToTopButton.classList.remove("pulse"); //si on remonte on enleve pulsation
      }
    } else {
      backToTopButton.classList.remove("visible"); //si moins de 100 px on enleve le bouton
      backToTopButton.classList.remove("pulse"); // et le pulse
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    //quand on clique sur le bouton
    e.preventDefault(); //empeche le comportement du lien par défaut

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    }); // et on fait défiler la page en douceur vers le haut
  });
});
