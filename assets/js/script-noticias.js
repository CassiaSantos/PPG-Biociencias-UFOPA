const noticiasContainer = document.getElementById("noticiasContainer");
// Alterar posteriormente a URL para a API
const jsonURL = "assets/js/data-img.json";

fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {
        const divNotice = document.createElement("div");
        divNotice.className = "col-xl-4 col-md-6";

        const article = document.createElement("article");
        const divImage = document.createElement("div");
        divImage.className = "post-img";

        const image = document.createElement("img");
        image.src = "assets/img/" + item.url;
        image.className = "img-fluid";

        const p_cat_post = document.createElement("p");
        p_cat_post.className = "post-category";
        p_cat_post.innerText = "Texto da Categoria";

        const title = document.createElement("h2");
        title.className = "title";
        
        const a1 = document.createElement("a");
        a1.href = "blog-details.html";

        const div_data_post = document.createElement("div");
        div_data_post.className = "d-flex align-items-center";
        const p_data_post = document.createElement("p");
        p_data_post.className = "post-date";
        const time_post = document.createElement('time');
        time_post.innerText = "Data postagem";
        
        p_data_post.appendChild(time_post);
        div_data_post.appendChild(p_data_post);

        divImage.appendChild(image);
        title.appendChild(a1);

        article.appendChild(divImage);
        article.appendChild(p_cat_post);
        article.appendChild(title);
        article.appendChild(div_data_post);
        divNotice.appendChild(article);

        // Criando a pagina de noticias de forma automatica via json

      })}).catch((error) => console.error("Erro ao carregar o JSON: ", error));

