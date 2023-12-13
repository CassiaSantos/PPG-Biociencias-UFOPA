function renderNotice() {  
    const noticiaDetail = document.getElementById("noticeDetail");
    const mapBar = document.getElementById("mapBar");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    // Alterar posteriormente a URL para a API
    const jsonURL = "https://apippgbio-or3c.vercel.app/noticia/id/" + id;

    function formatarData(dataString) {
      const meses = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro",
        "Outubro", "Novembro", "Dezembro"
      ];
    
      const data = new Date(`${dataString}T00:00:00-03:00`);
      const dia = data.getDate();
      const mes = meses[data.getMonth()];
      const ano = data.getFullYear();
    
      return `${dia} de ${mes} de ${ano}`;
  };
  
    fetch(jsonURL)
      .then((response) => response.json())
      .then((data) => {
        let noticiasHTML = "";
        let dataFormatada = formatarData(data.data);

        //Necessário alterar o src da imagem
        //Necessário implementar o conteudo da noticia depois de renderizar a variável noticiasHTML
        
          noticiasHTML += `
            <article class="blog-details">
              <div class="post-img">
                <img src="assets/img/${data.imagem}" alt="" class="img-fluid">
              </div>
              <h2 class="title">${data.titulo}</h2>
              <div class="meta-top">
                <ul>
                  <li class="d-flex align-items-center"><i class="bi bi-bookmarks-fill"></i> <a href="blog.html?categoria=${data.categorias[0]}">${data.categorias[0]}</a></li>
                  <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a><time datetime="${data.data}">${dataFormatada} às ${data.hora}</time></a></li>
                </ul>
              </div>
              <div class="content" id="noticeRenderHtml">
                <p>${data.texto}</p>
              </div>
            </article>
          `;
  
        noticiaDetail.innerHTML = noticiasHTML;
        const cat = `<li>${data.categorias[0]}</li>`
        mapBar.innerHTML += cat;
  
    
      })
      .catch((error) => console.error("Erro ao carregar o JSON: ", error));
  }
  
  window.addEventListener('DOMContentLoaded', renderNotice);
  