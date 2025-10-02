import { articles } from "./data.js";




// bouton burger

const burguer = document.querySelector('.burguer ');
const close_nav = document.querySelector(".close_nav");
const nav = document.querySelector("nav");

if (burguer) {
  burguer.addEventListener("click", () => {
    nav.classList.toggle('active');
  });

  close_nav.addEventListener('click', () => {
    nav.classList.remove('active');
    
  });
}

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});



// formater la date

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('fr-FR');
}



if (!localStorage.getItem("articles")) {
  localStorage.setItem("articles", JSON.stringify(articles));
}

let les_articles = JSON.parse(localStorage.getItem("articles")) || [];

  function Afficher_article(liste = les_articles) {
    const container_article = document.querySelector('.articles');

    if (!container_article) return;

    container_article.innerHTML = ""; 

    if (liste.length === 0) {
      container_article.innerHTML = `
        <p class="message_article_vide">Aucun article disponible. Ajoutez-en un ! ✍️</p>
      `;
      return;
    }

    liste.forEach((article) => {
      const new_article = document.createElement('article');
      new_article.className = "card post";

      new_article.innerHTML = `
        <img src="${article.image}" alt="Design web">
        <div class="">
          <h2>${article.titre}</h2>
          <div class="muted">Publié le ${formatDate(article.date_publication)} — ${article.categorie}</div>
          <p class="excerpt text_limite">${article.contenu_article}</p>
          <div class="meta">
            <div class="muted">${article.auteur}</div>
            <a class="readmore"   onclick="window.location.href='/article.html?id=${article.id}'">En savoir plus →</a>
          </div>

        
        </div>
      `;

      container_article.appendChild(new_article);

    });

  

  
  }

Afficher_article();

  function Ajouter_article() {
    const ajouter_btn = document.querySelector('.btn-submit');
    if (!ajouter_btn) return;

    const inputImage = document.getElementById('image');
    const preview = document.getElementById('preview');
    let imageBase64 = ""; 
    
  const MAX_SIZE_MB = 1;

  inputImage.addEventListener('change', (e) => {
    const file = e.target.files[0];

     

    if (file) {

      const la_taille = file.size / 900 / 900 ;

      if(la_taille > MAX_SIZE_MB){

          alert(`Le fichier est trop lourd ! Maximum ${MAX_SIZE_MB} Mo.`);
           inputImage.value = '';
            preview.style.display = 'none';
            return;
   
          } else {

          const reader = new FileReader();

          reader.onload = function (event) {
            imageBase64 = event.target.result;
            preview.src = imageBase64;      
            preview.style.display = "block";  
          };

          reader.readAsDataURL(file); 

          }


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



recherche_input.addEventListener('keyup', (e) => {
  const saisir = e.target.value.trim().toLowerCase();
  const resultat = les_articles.filter(a => a.titre.toLowerCase().includes(saisir));

  const container_article = document.querySelector('.articles');

  if (resultat.length > 0) {
    container_article.innerHTML = '';
    Afficher_article(resultat);
  } else {
    container_article.innerHTML = `
      <p class="message_recherche">
        Aucun article disponible pour ✍️ <br>
        <span>${saisir}</span>.
      </p>
    `;
  }
});

  // article recent 

// 

const article_recent= document.getElementById('article_recent');

article_recent.innerHTML =""
const recent = les_articles.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    console.log(recent);

recent.forEach(article => {
  const li = document.createElement("li");
  li.textContent = ` ${ article.titre } `;

  article_recent.appendChild(li);
});
