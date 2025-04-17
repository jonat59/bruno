document.addEventListener("DOMContentLoaded", () => {
  //chargement du DOM
  const form = document.getElementById("form"); //formulaire principale
  const confirmation = document.getElementById("confirmation"); //message de confirmation
  const captchaInput = document.getElementById("captcha"); //champ de saisie captcha
  const captchaLabel = document.getElementById("captcha-label"); //label du captcha(question)
  //selection des elements html

  let a = Math.floor(Math.random() * 10 + 1);
  let b = Math.floor(Math.random() * 10 + 1);
  captchaLabel.textContent = `Combien font ${a} + ${b} ?`;
  //creation de 2 nombre aléatoires de 1 a 10 pour poser une question de type addition

  const regex = {
    // securité regex
    nom: /^[a-zA-ZÀ-ÿ\s-]{2,30}$/,
    prenom: /^[a-zA-ZÀ-ÿ\s-]{2,30}$/, //lettres, accents, tirets, entre 2 et 30 caracteres
    telephone: /^0[1-9](\d{2}){4}$/, //format francais
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, //format standard e-mail
    message: /.+/, //n'importe quel contenu, tant qu il n'est pas vide
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault(); //Empechement de rechargement de page
    let valid = true;

    const champs = ["nom", "prenom", "telephone", "email", "message"];
    //parcours des champs à valider avec regex

    champs.forEach((field) => {
      const input = document.getElementById(field);
      const error = input.nextElementSibling;
      input.classList.remove("invalid"); //suppression de la classe d erreur

      if (!regex[field].test(input.value.trim())) {
        //test du champ avec sa regex
        error.textContent = "Champ invalide.";
        error.style.display = "block";
        input.classList.add("invalid");
        valid = false;
      } else {
        error.textContent = "";
        error.style.display = "none";
      }
    }); //si invalide-> message d erreur + classe invalid

    const captchaError = captchaInput.nextElementSibling;
    captchaInput.classList.remove("invalid"); //si valide-> suppression du message d erreur

    if (parseInt(captchaInput.value.trim()) !== a + b) {
      captchaError.textContent = "Captcha incorrect.";
      captchaError.style.display = "block";
      captchaInput.classList.add("invalid");
      valid = false;
    } else {
      captchaError.textContent = "";
      captchaError.style.display = "none";
    } //verification que la réponse est correcte sinon message d erreur et mise en forme du champ

    if (valid) {
      //si tous les champs sont valide et le captcha correct
      confirmation.style.display = "block"; //affichage du message de confirmation
      form.reset(); //réinitialisation du formulaire

      a = Math.floor(Math.random() * 10 + 1);
      b = Math.floor(Math.random() * 10 + 1);
      captchaLabel.textContent = `Combien font ${a} + ${b} ?`; //generation d un nouveau captcha

      setTimeout(() => {
        confirmation.style.display = "none";
      }, 5000); //cacher le message apres 5 secondes
    }
  });
});
