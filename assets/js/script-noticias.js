function createNoticias() {
  const noticiasContainer = document.getElementById("noticiasContainer");
  // Alterar posteriormente a URL para a API
  const jsonURL = "http://localhost:3000/noticias-recentes";
  const pagNoticias = "blog-details.html";

  fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
      let noticiasHTML = "";
      let btnMais = "";

      data.forEach((item, index) => {
        noticiasHTML += `
          <div class="col-xl-4 col-md-6">
            <article>
              <div class="post-img">
                <img src="assets/img/${item.imagem}" class="img-fluid">
              </div>
              <p class="post-category">${item.categorias[0]}</p>
              <h2 class="title">
                <a href="${pagNoticias}?id=${item._id}">${item.titulo}</a>
              </h2>
              <div class="d-flex align-items-center">
                <p class="post-date">
                  <time>${item.data} às ${item.hora}</time>
                </p>
              </div>
            </article>
          </div>
        `;
      });

      btnMais = `
        <div class="text-center pt-4">
        <a class="button-green" href="${pagNoticias}">Todas as notícias</a>
        </div>
      `;

      noticiasContainer.innerHTML = noticiasHTML;
      noticiasContainer.innerHTML += btnMais;


    })
    .catch((error) => console.error("Erro ao carregar o JSON: ", error));
}

window.addEventListener('DOMContentLoaded', createNoticias);
