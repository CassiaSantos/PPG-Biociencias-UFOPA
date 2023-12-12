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
};

function createNoticias() {
  const noticiasContainer = document.getElementById("noticiasContainer");
  const pagNoticias = "blog-details.html";

  let noticiasData = JSON.parse(sessionStorage.getItem("noticiasRecData")) || [];
  let lastFetchTime = sessionStorage.getItem("lastFetchTimeNR")
    ? parseInt(sessionStorage.getItem("lastFetchTimeNR"))
    : 0;

  if (noticiasData.length > 0 && Date.now() - lastFetchTime < 60 * 1000) {
    renderNoticias(noticiasData, noticiasContainer, pagNoticias);
  } else {
    const jsonURL = "https://apippgbio-or3c.vercel.app/noticias-recentes";

    

    fetch(jsonURL)
      .then((response) => response.json())
      .then((data) => {
        noticiasData = data;
        sessionStorage.setItem("noticiasRecData", JSON.stringify(data));
        sessionStorage.setItem("lastFetchTimeNR", Date.now().toString());

        renderNoticias(data, noticiasContainer, pagNoticias);
      })
      .catch((error) => console.error("Erro ao carregar o JSON: ", error));
  }
}

function renderNoticias(data, noticiasContainer, pagNoticias) {
  let noticiasHTML = "";
  let btnMais = "";

  if(window.innerWidth <= 767){
    data.slice(0, 3).forEach((item, index) => {
      const dataFormatada = formatarData(item.data);
      noticiasHTML += `
        <div class="col-xl-4 col-md-6" data-aos="fade-up">
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
    });
  }else{
    data.forEach((item, index) => {
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
    });
  }

  btnMais = `
    <div class="text-center pt-4">
      <a class="button-green" href="blog.html">Todas as notícias</a>
    </div>
  `;

  noticiasContainer.innerHTML = noticiasHTML;
  noticiasContainer.innerHTML += btnMais;
}

window.addEventListener('DOMContentLoaded', createNoticias);
