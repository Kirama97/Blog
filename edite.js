


const params = new URLSearchParams(window.location.search)

const id = params.get("id");


const articles = JSON.parse(localStorage.getItem('articles')) || [] ;

const article  = articles.find( a => a.id == id);


console.log(article)
 if(!article){
    alert('Article introuvable')
    window.location.href="/index.html";
    
 }


document.querySelector('input[name="titre"]').value = article.titre;
document.querySelector('input[name="auteur"]').value = article.auteur;
// document.querySelector('input[name="image"]').value = article.image;
document.getElementById("categorie").value = article.categorie;
document.getElementById("contenu").value = article.contenu_article;


document.querySelector('.btn-submit').addEventListener('click' , (e) =>{

  e.preventDefault();
  
  
 const titre = document.querySelector('input[name="titre"]').value.trim();
  const auteur = document.querySelector('input[name="auteur"]').value.trim();
  const image = document.querySelector('input[name="image"]').value.trim();
  const categorie = document.getElementById("categorie").value.trim();
  const contenu = document.getElementById("contenu").value.trim();

  if (!titre || !auteur || !image || !categorie || !contenu) {
    alert(" Tous les champs sont obligatoires !");
    return;
  }


  article.titre = titre;
  article.auteur = auteur;
  article.image = image;
  article.categorie = categorie;
  article.contenu_article = contenu;

localStorage.setItem("articles" , JSON.stringify(articles));

  alert("✔️ Article mis à jour avec succès !");
  window.location.href = "/index.html";

 
})