const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const articles = JSON.parse(localStorage.getItem('articles')) || [];
const article = articles.find(a => a.id == id);

if (!article) {
  alert('Article introuvable');
  window.location.href = "/index.html";
}

document.querySelector('input[name="titre"]').value = article.titre;
document.querySelector('input[name="auteur"]').value = article.auteur;
document.getElementById("categorie").value = article.categorie;
document.getElementById("contenu").value = article.contenu_article;

const inputImage = document.getElementById('image');
const preview = document.getElementById('preview');
preview.src = article.image;
  preview.style.display = "block";



console.log(preview.src);

let imageBase64 = "";
const MAX_SIZE_MB = 2; 

inputImage.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const la_taille = file.size / (1024 * 1024);

    if (la_taille > MAX_SIZE_MB) {
      alert(`Le fichier est trop lourd ! Maximum ${MAX_SIZE_MB} Mo.`);
      inputImage.value = '';
      preview.style.display = 'none';
      return;
    }

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

// Sauvegarde des modifications
document.querySelector('.btn-submit').addEventListener('click', (e) => {
  e.preventDefault();

  const titre = document.querySelector('input[name="titre"]').value.trim();
  const auteur = document.querySelector('input[name="auteur"]').value.trim();
  const categorie = document.getElementById("categorie").value.trim();
  const contenu = document.getElementById("contenu").value.trim();
  const image = imageBase64 || article.image; 

  if (!titre || !auteur || !categorie || !contenu) {
    alert("⚠️ Tous les champs sont obligatoires !");
    return;
  }

  article.titre = titre;
  article.auteur = auteur;
  article.image = image;
  article.categorie = categorie;
  article.contenu_article = contenu;

  localStorage.setItem("articles", JSON.stringify(articles));

  alert("✔️ Article mis à jour avec succès !");
  window.location.href = "/index.html";
});
