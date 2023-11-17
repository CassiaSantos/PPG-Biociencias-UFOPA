let currentSize = sessionStorage.getItem("currentSize")
  ? parseInt(sessionStorage.getItem("currentSize"))
  : 9;
let noticiasData = JSON.parse(sessionStorage.getItem("noticiasData")) || [];
let lastFetchTime = sessionStorage.getItem("lastFetchTime")
  ? parseInt(sessionStorage.getItem("lastFetchTime"))
  : 0;

const noticiasBtn = document.getElementById("btn-more-notice");

function loadNews(currentSize) {
  const noticiasContainer = document.getElementById("noticiasContainer");
  const pagNoticias = "blog-details.html";
  const jsonURL = "http://localhost:3000/noticias";

  if (noticiasData.length > 0 && Date.now() - lastFetchTime < 60 * 1000) {
    renderNews(noticiasData, currentSize, noticiasContainer, pagNoticias);
  } else {
    fetch(jsonURL)
      .then((response) => response.json())
      .then((data) => {
        noticiasData = data;
        sessionStorage.setItem("noticiasData", JSON.stringify(data));
        sessionStorage.setItem("lastFetchTime", Date.now().toString());

        renderNews(data, currentSize, noticiasContainer, pagNoticias);
      })
      .catch((error) => console.error("Erro ao carregar o JSON: ", error));
  }
}

function renderNews(data, currentSize, noticiasContainer, pagNoticias) {
  let noticiasHTML = "";
  if (currentSize >= data.length) {
    noticiasBtn.style.display = "none";
  }

  for (let index = 0; index < Math.min(currentSize, data.length); index++) {
    const item = data[index];
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
  }

  noticiasContainer.innerHTML = noticiasHTML;
}

function loadMoreNews(event) {
  event.preventDefault();
  currentSize += 6;
  sessionStorage.setItem("currentSize", currentSize);
  renderNews(noticiasData, currentSize, noticiasContainer, pagNoticias);
}

function createNoticias() {
  loadNews(currentSize);
}

noticiasBtn.addEventListener("click", loadMoreNews);
window.addEventListener("DOMContentLoaded", createNoticias);
