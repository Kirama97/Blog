import { articles } from "./data.js";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('fr-FR');
}


function open_option() {
  const trois_points = document.querySelectorAll('.trois_points');

  trois_points.forEach((p) => {
    const option = p.nextElementSibling; 

    p.addEventListener('click', () => {
      option.classList.toggle("active");

      if (p.src.includes("x.svg")) {
        p.src = "/Assets/icone/trois_points.svg";
      } else {
        p.src = "/Assets/icone/x.svg";
      }
    });
  });
}

open_option();

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
      <div class="bloc_article">
        <h2>${article.titre}</h2>
        <div class="muted">Publié le ${formatDate(article.date_publication)} — ${article.categorie}</div>
        <p class="excerpt">${article.contenu_article}</p>
        <div class="meta">
          <div class="muted">${article.auteur}</div>
          <a class="readmore" href="#" onclick="editArticle(${index})">En savoir plus →</a>
        </div>

        <img class="trois_points" title="Option" src="/Assets/icone/trois_points.svg" alt="">
        <div class="option">
          <div class="option_box modifier_article" onclick="window.location.href='/Pages/edite.html?id=${article.id}'" >
            <p>Modifier</p> 
            <img src="/Assets/icone/pencil.svg" id="option_icone" class="edite" alt="">
          </div>
          <div class="option_box supprimer_article" onclick="deleteArticle(${index})" >
            <p>Supprimer</p>
            <img src="/Assets/icone/trash.svg" id="option_icone" class="trash" alt="">
          </div>
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




// supprimer mon article

window.deleteArticle = function (index) {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];

  if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;

  articles.splice(index, 1);


  localStorage.setItem("articles", JSON.stringify(articles));

  alert("🗑️ Article supprimé !");
  window.location.reload(); 
};



window.editeArticle = function () {



}