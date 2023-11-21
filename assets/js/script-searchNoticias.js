const formSearch = document.getElementById("form-search").addEventListener("submit", (event)=>{
    event.preventDefault();
    searchNoticeByTitle;
})

function searchNoticeByTitle() {
    
    const searchInput = document.getElementById("search-notice").value;
  


    fetch(`http://localhost:3000/noticias/titulo/${searchInput}`)
        .then(response => {
            if (!response.ok) {
                Swal.fire({
                    title: "Nenhum resultado!",
                    text: "Tente novamente usando outra palavra-chave",
                    icon: "info"
                  });

                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            const redirectURL = `blog.html?titulo=${searchInput}`;
            window.location.href = redirectURL;
        })
        .catch(error => {
            console.error('Erro na requisição:', error.message);
        });
}


function createLastNoticias() {
    const noticiasContainer = document.getElementById("last-notices");
    const pagNoticias = "blog-details.html";
    

    let noticiasData = JSON.parse(sessionStorage.getItem("noticiasRecData")) || [];
    let categoriasData = JSON.parse(sessionStorage.getItem("categoriasData")) || [];
    let lastFetchTime = sessionStorage.getItem("lastFetchTimeSN")
        ? parseInt(sessionStorage.getItem("lastFetchTimeSN"))
        : 0;

    if (noticiasData.length > 0 && Date.now() - lastFetchTime < 60 * 1000) {
        renderNoticias(noticiasData, noticiasContainer, pagNoticias);
        renderCategorias(categoriasData);
    } else {
        const jsonURL1 = "http://localhost:3000/noticias-recentes";
        const jsonURL2 = "http://localhost:3000/noticias/categorias";

        fetch(jsonURL1)
            .then((response) => response.json())
            .then((data) => {
                noticiasData = data;
                sessionStorage.setItem("noticiasRecData", JSON.stringify(data));
                sessionStorage.setItem("lastFetchTimeNR", Date.now().toString());

                renderNoticias(data, noticiasContainer, pagNoticias);
            }).then(
                fetch(jsonURL2).then((response) => response.json())
                .then((data)=>{
                    categoriasData = data;
                    sessionStorage.setItem("categoriasData", JSON.stringify(data));
                    renderCategorias(data);
                })
            )
            .catch((error) => console.error("Erro ao carregar o JSON: ", error));
        

        
    }
}

function renderNoticias(data, noticiasContainer, pagNoticias) {
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

    let noticiasHTML = "";



    data.forEach((item, index) => {
        const dataFormatada = formatarData(item.data);
        noticiasHTML += `

            <div class="post-item mt-3">
                <img src="assets/img/${item.imagem} alt="">
                <div>
                    <h4><a href="${pagNoticias}?id=${item._id}">${item.titulo}</a></h4>
                    <time>${dataFormatada} às ${item.hora}h</time>
                </div>
            </div>
        `;
    });


    noticiasContainer.innerHTML = noticiasHTML;
}

function renderCategorias(data) {
    const allNoticias = "blog.html";
    const listcat = document.getElementById("listcat");
    let categoriasHTML = "";
    
    for (const chave in data){
        if (data.hasOwnProperty(chave)){
            let valor = data[chave];
            categoriasHTML += `
                <li>
                    <a href="${allNoticias}?categoria=${chave}">${chave}<span>(${valor})</span>
                    </a>
                </li>
            `
        }
    };

    listcat.innerHTML = categoriasHTML;

}
window.addEventListener('DOMContentLoaded', createLastNoticias);
