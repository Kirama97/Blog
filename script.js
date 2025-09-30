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

        <img class="trois_points" src="/Assets/icone/trois_points.svg" alt="">
        <div class="option">
          <div class="option_box modifier_article" onclick="editArticle(${index})">
            <p>Modifier</p> 
            <img src="/Assets/icone/pencil.svg" id="option_icone" class="edite" alt="">
          </div>
          <div class="option_box supprimer_article" onclick="window.location.href='Pages/edite.html'">
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

  ajouter_btn.addEventListener('click', (e) => {
    e.preventDefault();

    const titre = document.querySelector('input[name="titre"]')?.value.trim();
    const auteur = document.querySelector('input[name="auteur"]')?.value.trim();
    const image = document.querySelector('input[name="image"]')?.value;
    const categorie = document.getElementById("categorie")?.value;
    const contenu_article = document.getElementById("contenu")?.value.trim();
    const date_publication = new Date().toISOString();

    if (!titre || !auteur || !image || !categorie || !contenu_article) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const id = Date.now();
    const value_article = { id, titre, auteur, date_publication, image, categorie, contenu_article };

    les_articles.push(value_article);
    localStorage.setItem('articles', JSON.stringify(les_articles));

    Afficher_article();
    alert("Article ajouté !");
    window.location.href='/index.html';
  });
}

Ajouter_article();

// modifier_un_article

// window.editArticle = function (index) {
//     const supprimer_article = document.querySelector('.modifier_article')
//     if(supprimer_article){
//         supprimer_article.addEventListener('click' , () => {
//            alert("Modifier l’article n°" );
//         })
//     }
  
// }







// supprimer mon article

window.deleteArticle = function (index) {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];

  if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;

  // Supprime l’article
  articles.splice(index, 1);

  // Met à jour le localStorage
  localStorage.setItem("articles", JSON.stringify(articles));

  alert("🗑️ Article supprimé !");
  window.location.reload(); // rafraîchit la liste
};
