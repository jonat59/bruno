const reseaux = document.querySelector("#reseaux"); //selection de la div reseaux
const root = document.documentElement; //selectionne la page html complete
function pos() {
  //aligne dynamiquement la div reseaux sur le bord du contenu <main>.
  const main = document.querySelector("main"); // selection du main
  if (main) {
    const pos = (root.clientWidth - main.clientWidth) / 2; //calcul de la marge entre main et bord de l'écran
    reseaux.style.right = `${pos}px`; //application de cette valeur pour coller au contenu, même si il est centré
  }
}
window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("resize", pos);
}); // listener pour recalculer la position à chaque redimensionnement de la fenêtre
pos(); //bien positionner dès le départ.
