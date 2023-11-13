function createNoticias() {
  const noticiasContainer = document.getElementById("noticiasContainer");
  const noticiasBtn = document.getElementById("blog-pagination");

  // Alterar posteriormente a URL para a API
  const jsonURL = "http://localhost:3000/noticias";
  const pagNoticias = "blog-details.html";
  let currentPage = 1;

  fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
      let noticiasHTML = "";
      let button = `
      <div class="justify-content-center d-flex">
            <button class="button-green p-1" id="paginaAnterior">Página Anterior</button>
            <button class="button-green p-1" id="proximaPagina">Próxima Página</button>
      </div>     
      `;
      console.log(data);

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




      noticiasContainer.innerHTML = noticiasHTML;
      noticiasBtn.innerHTML = button;


    })
    .catch((error) => console.error("Erro ao carregar o JSON: ", error));
}

window.addEventListener('DOMContentLoaded', createNoticias);
