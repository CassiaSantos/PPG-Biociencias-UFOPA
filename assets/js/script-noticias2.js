let currentSize = sessionStorage.getItem("currentSize")
  ? parseInt(sessionStorage.getItem("currentSize"))
  : 9;
let noticiasData = JSON.parse(sessionStorage.getItem("noticiasData")) || [];
let lastFetchTime = sessionStorage.getItem("lastFetchTime")
  ? parseInt(sessionStorage.getItem("lastFetchTime"))
  : 0;

const noticiasBtn = document.getElementById("btn-more-notice");
const mapBar = document.getElementById("mapBar");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const categoria = urlParams.get('categoria');
const titulo = urlParams.get('titulo');

function formatarData(dataString) {
  const meses = [
    "Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro",
    "Outubro", "Novembro", "Dezembro"
  ];

  const data = new Date(dataString);
  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();

  return `${dia} de ${mes} de ${ano}`;
}

function renderNews(data, currentSize, noticiasContainer, pagNoticias) {
  let noticiasHTML = "";
  if (currentSize >= data.length) {
    noticiasBtn.style.display = "none";
  }

  for (let index = 0; index < Math.min(currentSize, data.length); index++) {
    const item = data[index];
    const dataFormatada = formatarData(item.data);
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
              <time>${dataFormatada} às ${item.hora}</time>
            </p>
          </div>
        </article>
      </div>
    `;
  }

  noticiasContainer.innerHTML = noticiasHTML;
}

function loadNews(currentSize) {
  const noticiasContainer = document.getElementById("noticiasContainer");
  const pagNoticias = "blog-details.html";
  let jsonURL = "";

  if (categoria != null) {
    const cat = `<li>${categoria}</li>`;
    mapBar.innerHTML += cat;
    jsonURL = "http://localhost:3000/noticias/categoria/" + categoria;
  } else if (titulo != null) {
    const title = `<li>Busca por "<i>${titulo}</i>".</li>`;
    mapBar.innerHTML += title;
    jsonURL = "http://localhost:3000/noticias/titulo/" + titulo;
  } else {
    jsonURL = "http://localhost:3000/noticias";
    if (noticiasData.length > 0 && Date.now() - lastFetchTime < 60 * 1000) {
      renderNews(noticiasData, currentSize, noticiasContainer, pagNoticias);
      return;
    }
  }

  fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
      noticiasData = data;
      if (!categoria && !titulo) {
        sessionStorage.setItem("noticiasData", JSON.stringify(data));
        sessionStorage.setItem("lastFetchTime", Date.now().toString());
      }
      renderNews(data, currentSize, noticiasContainer, pagNoticias);
    })
    .catch((error) => console.error("Erro ao carregar o JSON: ", error));
}

function loadMoreNews(event) {
  event.preventDefault();
  currentSize += 6;
  sessionStorage.setItem("currentSize", currentSize);
  renderNews(noticiasData, currentSize, noticiasContainer, pagNoticias);
}

function createNoticias2() {
  loadNews(currentSize);
}

// Event Listeners
noticiasBtn.addEventListener("click", loadMoreNews);
window.addEventListener("DOMContentLoaded", createNoticias2);
