document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  // Apparition du bouton après un certain défilement
  window.addEventListener('scroll', function() {
      // Apparaît après 300px de défilement
      if (window.scrollY > 100) {
          backToTopButton.classList.add('visible');
          
          // Animation supplémentaire quand on défile très bas (facultatif)
          if (window.scrollY > 700) {
              backToTopButton.classList.add('pulse');
          } else {
              backToTopButton.classList.remove('pulse');
          }
      } else {
          backToTopButton.classList.remove('visible');
          backToTopButton.classList.remove('pulse');
      }
  });
  
  // Fonction de retour en haut avec animation douce
  backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Animation douce pour remonter
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});