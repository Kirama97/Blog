import { articles } from "./data.js";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('fr-FR');
}




if (!localStorage.getItem("articles")) {
  localStorage.setItem("articles", JSON.stringify(articles));
}

let les_articles = JSON.parse(localStorage.getItem("articles")) || [];

  function Afficher_article() {
    const container_article = document.querySelector('.articles');

    if (!container_article) return;

    container_article.innerHTML = ""; 

    if (les_articles.length === 0) {
      container_article.innerHTML = `
        <p class="text-center text-gray-500 text-lg">Aucun article disponible. Ajoutez-en un ! ✍️</p>
      `;
      return;
    }

    les_articles.forEach((article, index) => {
      const new_article = document.createElement('article');
      new_article.className = "card post";

      new_article.innerHTML = `
        <img src="${article.image}" alt="Design web">
        <div class="">
          <h2>${article.titre}</h2>
          <div class="muted">Publié le ${formatDate(article.date_publication)} — ${article.categorie}</div>
          <p class="excerpt">${article.contenu_article}</p>
          <div class="meta">
            <div class="muted">${article.auteur}</div>
            <a class="readmore"   onclick="window.location.href='/article.html?id=${article.id}'">En savoir plus →</a>
          </div>

        
        </div>
      `;

      container_article.appendChild(new_article);

    });

    open_option(); 

  
  }

Afficher_article();

  function Ajouter_article() {
    const ajouter_btn = document.querySelector('.btn-submit');
    if (!ajouter_btn) return;

    const inputImage = document.getElementById('image');
    const preview = document.getElementById('preview');
    let imageBase64 = ""; 
    
  inputImage.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        imageBase64 = event.target.result;
        preview.src = imageBase64;      
        preview.style.display = "block";  
      };

      reader.readAsDataURL(file); 
    } else {
      preview.style.display = 'none';
      preview.src = '';
      imageBase64 = "";
    }
  });

    ajouter_btn.addEventListener('click', (e) => {
      e.preventDefault();

      const titre = document.querySelector('input[name="titre"]')?.value.trim();
      const auteur = document.querySelector('input[name="auteur"]')?.value.trim();
      const categorie = document.getElementById("categorie")?.value;
      const contenu_article = document.getElementById("contenu")?.value.trim();
      const date_publication = new Date().toISOString();

      if (!titre || !auteur || !imageBase64 || !categorie || !contenu_article) {
        alert("Veuillez remplir tous les champs !");
        return;
      }

      const id = Date.now();
      const value_article = {
        id,
        titre,
        auteur,
        date_publication,
        image: imageBase64,
        categorie,
        contenu_article
      };

      les_articles.push(value_article);
      localStorage.setItem('articles', JSON.stringify(les_articles));

      alert("✅ Article ajouté avec succès !");
      window.location.href = '/index.html';
    });
  }

Ajouter_article();





// recherche 

const recherche_input = document.getElementById('Recherche');


