document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const confirmation = document.getElementById("confirmation");
  const captchaInput = document.getElementById("captcha");
  const captchaLabel = document.getElementById("captcha-label");

  // Captcha simple : addition de 2 nombres
  let a = Math.floor(Math.random() * 10 + 1);
  let b = Math.floor(Math.random() * 10 + 1);
  captchaLabel.textContent = `Combien font ${a} + ${b} ?`;

  const regex = {
    nom: /^[a-zA-ZÀ-ÿ\s-]{2,30}$/,
    prenom: /^[a-zA-ZÀ-ÿ\s-]{2,30}$/,
    telephone: /^0[1-9](\d{2}){4}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /.+/,
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const champs = ["nom", "prenom", "telephone", "email", "message"];

    champs.forEach((field) => {
      const input = document.getElementById(field);
      const error = input.nextElementSibling;
      input.classList.remove("invalid");

      if (!regex[field].test(input.value.trim())) {
        error.textContent = "Champ invalide.";
        error.style.display = "block";
        input.classList.add("invalid");
        valid = false;
      } else {
        error.textContent = "";
        error.style.display = "none";
      }
    });

    // Validation captcha
    const captchaError = captchaInput.nextElementSibling;
    captchaInput.classList.remove("invalid");

    if (parseInt(captchaInput.value.trim()) !== a + b) {
      captchaError.textContent = "Captcha incorrect.";
      captchaError.style.display = "block";
      captchaInput.classList.add("invalid");
      valid = false;
    } else {
      captchaError.textContent = "";
      captchaError.style.display = "none";
    }

    if (valid) {
      confirmation.style.display = "block";
      form.reset();

      // Nouveau captcha
      a = Math.floor(Math.random() * 10 + 1);
      b = Math.floor(Math.random() * 10 + 1);
      captchaLabel.textContent = `Combien font ${a} + ${b} ?`;

      // Masquer la confirmation après 5 secondes
      setTimeout(() => {
        confirmation.style.display = "none";
      }, 5000);
    }
  });
});
