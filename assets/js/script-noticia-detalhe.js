function renderNotice() {  
    const noticiaDetail = document.getElementById("noticeDetail");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    // Alterar posteriormente a URL para a API
    const jsonURL = "http://localhost:3000/noticia/id/" + id;

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
  
    fetch(jsonURL)
      .then((response) => response.json())
      .then((data) => {
        let noticiasHTML = "";
        let dataFormatada = formatarData(data.data);
        
        console.log(dataFormatada);
          // Substitua as informações fixas pelos dados reais da API
          noticiasHTML += `
            <article class="blog-details">
              <div class="post-img">
                <img src="assets/img/${data.imagem}" alt="" class="img-fluid">
              </div>
              <h2 class="title">${data.titulo}</h2>
              <div class="meta-top">
                <ul>
                  <li class="d-flex align-items-center"><i class="bi bi-bookmarks-fill"></i> <a href="blog.html?cat">${data.categorias[0]}</a></li>
                  <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a><time datetime="${data.data}">${dataFormatada} às ${data.hora}</time></a></li>
                </ul>
              </div>
              <div class="content">
                <p>${data.texto}</p>
              </div>
            </article>
          `;
  
        noticiaDetail.innerHTML = noticiasHTML;
  
    
      })
      .catch((error) => console.error("Erro ao carregar o JSON: ", error));
  }
  
  window.addEventListener('DOMContentLoaded', renderNotice);
  