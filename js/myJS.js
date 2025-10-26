
    /* -- Handlers fournis (onmouseover / onmouseleave) - ne pas les supprimer -- */
    function handleMouseOver(e){
      const img = e.currentTarget || e.target;
      img.classList.add('hover');
      console.log('mouse over:', img.id);
    }
    function handleMouseLeave(e){
      const img = e.currentTarget || e.target;
      img.classList.remove('hover');
      console.log('mouse leave:', img.id);
    }

    /* -- Nouvelle initialisation appelée à l'événement onload -- */
    function initGallery(){
      console.log('initGallery : document chargé, initialisation des écouteurs');

      const gallery = document.getElementById('gallery');
      const imgs = gallery.querySelectorAll('img');

      // Boucle sur chaque image - ajout des tabindex, écouteurs focus/blur et attributs personnalisés
      for(let i = 0; i < imgs.length; i++){
        const img = imgs[i];

        // Ajouter tabindex si non présent (rendre focusable)
        if(!img.hasAttribute('tabindex')){
          img.setAttribute('tabindex', '0');
        }

        // Ajouter un attribut data-tabfocus pour indiquer qu'on l'a configuré
        img.setAttribute('data-tabfocus', 'true');

        // Ajouter les écouteurs de focus/blur (même modèle que mouseover/mouseleave)
        img.addEventListener('focus', function(e){
          e.currentTarget.classList.add('tabfocused');
          console.log('focus clavier:', e.currentTarget.id);
        });
        img.addEventListener('blur', function(e){
          e.currentTarget.classList.remove('tabfocused');
          console.log('blur clavier:', e.currentTarget.id);
        });

        // Garder la compatibilité : aussi ajouter des écouteurs par JS pour mouseover/mouseleave
        img.addEventListener('mouseover', handleMouseOver);
        img.addEventListener('mouseleave', handleMouseLeave);

        // Gestion d'une action clavier (Entrée pour sélectionner / basculer sélection)
        img.addEventListener('keydown', function(e){
          if(e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            this.classList.toggle('selected');
            console.log('select toggle via clavier:', this.id);
          }
        });
      }

      // Message final pour s'assurer que tout est prêt
      console.log('initGallery : ' + imgs.length + ' images initialisées avec tabindex et écouteurs.');
    }