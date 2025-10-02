document.addEventListener('DOMContentLoaded', () => {

  const articles = JSON.parse(localStorage.getItem('articles')) || [];
  const params = new URLSearchParams(window.location.search);
  const articleId = parseInt(params.get('id'), 10);
  const articleContainer = document.getElementById('articleContainer');

  if (!articleId || articles.length === 0) {
    articleContainer.innerHTML = '<p class="muted text-center">Article introuvable 😢</p>';
    return;
  }

  const article = articles.find(a => a.id === articleId);
  if (!article) {
    articleContainer.innerHTML = '<p class="muted text-center">Article introuvable 😢</p>';
    return;
  }


  articleContainer.innerHTML = `
    <div class="box_image_article" style="position:relative;">
      <img class="image_article" src="${article.image}" alt="${article.titre}" style="width:100%; max-height:400px; object-fit:cover; border-radius:8px;">

      <!-- Option menu -->
      <img class="trois_points" title="Option" src="/Assets/icone/trois_points.svg" alt="" >
      <div class="option" ">
        <div class="option_box modifier_article" id="modifier">
          <p>Modifier</p>
          <img src="/Assets/icone/pencil.svg" id="option_icone" class="edite" alt="">
        </div>
        <div class="option_box supprimer_article" id="supprimer">
        <p>Supprimer</p>
        <img src="/Assets/icone/trash.svg" id="option_icone" class="trash" alt="">
        </div>
      </div>
    </div>

    <div style="padding:10px;">
      <h1 style="margin-top:0">${article.titre}</h1>
      <div class="muted" style="margin-bottom:20px;">
        Publié le ${new Date(article.date_publication).toLocaleDateString('fr-FR')} — ${article.categorie} — par ${article.auteur}
      </div>
      <p style="line-height:1.6; font-size:16px;">${article.contenu_article}</p>
    </div>
  `;


  const trois_points = document.querySelector('.trois_points');
  const option = document.querySelector('.option');
  const modifierBtn = document.getElementById('modifier');
  const supprimerBtn = document.getElementById('supprimer');

  // Menu toggle
  trois_points.addEventListener('click', (e) => {
    e.stopPropagation(); 
    option.style.display = option.style.display === 'block' ? 'none' : 'block';
    const isX = trois_points.src.endsWith("x.svg");
    trois_points.src = isX ? "/Assets/icone/trois_points.svg" : "/Assets/icone/x.svg";
  });

  // Clic en dehors pour fermer
  document.addEventListener('click', () => {
    option.style.display = 'none';
    trois_points.src = "/Assets/icone/trois_points.svg";
  });

  // Modifier
  modifierBtn.addEventListener('click', () => {
    window.location.href = `/Pages/edite.html?id=${article.id}`;
  });

  // Supprimer
  supprimerBtn.addEventListener('click', () => {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      const index = articles.findIndex(a => a.id === article.id);
      if (index !== -1) {
        articles.splice(index, 1);
        localStorage.setItem('articles', JSON.stringify(articles));
        alert("🗑️ Article supprimé !");
        window.location.href = '/index.html';
      }
    }
  });

});
