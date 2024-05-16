const formSearch = document.getElementById("form-search").addEventListener("submit", (event)=>{
    event.preventDefault();
    searchNoticeByTitle;
})

function searchNoticeByTitle() {
    
    const searchInput = document.getElementById("search-notice").value;
  


    fetch(`https://apippgbio-or3c.vercel.app/noticias/titulo/${searchInput}`)
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
    const lastNoticiasContainer = document.getElementById("last-notices");
    const pagNoticias = "noticia.html";
    

    let noticiasData = JSON.parse(sessionStorage.getItem("noticiasRecData")) || [];
    let categoriasData = JSON.parse(sessionStorage.getItem("categoriasData")) || [];
    let lastFetchTime = sessionStorage.getItem("lastFetchTimeSN")
        ? parseInt(sessionStorage.getItem("lastFetchTimeSN"))
        : 0;

    if (noticiasData.length > 0 && Date.now() - lastFetchTime < 60 * 1000) {
        renderNoticias2(noticiasData, lastNoticiasContainer, pagNoticias);
        renderCategorias(categoriasData);
    } else {
        const jsonURL1 = "https://apippgbio-or3c.vercel.app/noticias-recentes";
        const jsonURL2 = "https://apippgbio-or3c.vercel.app/noticias/categorias";

        fetch(jsonURL1)
            .then((response) => response.json())
            .then((data) => {
                noticiasData = data;
                sessionStorage.setItem("noticiasRecData", JSON.stringify(data));
                sessionStorage.setItem("lastFetchTimeNR", Date.now().toString());

                renderNoticias2(data, lastNoticiasContainer, pagNoticias);
            }).then(
                fetch(jsonURL2).then((response) => response.json())
                .then((data)=>{
                    categoriasData = data;
                    sessionStorage.setItem("categoriasData", JSON.stringify(data));
                    renderCategorias(categoriasData);
                })
            )
            .catch((error) => console.error("Erro ao carregar o JSON: ", error));
        

        
    }
}

function renderNoticias2(data, lastNoticiasContainer, pagNoticias) {
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

    var lastNoticiasHTML = "";



    data.forEach((item, index) => {
        const dataFormatada = formatarData(item.data);
        lastNoticiasHTML += `

            <div class="post-item mt-3">
                <img src="${item.imagem}" alt="">
                <div>
                    <h4><a href="${pagNoticias}?id=${item._id}">${item.titulo}</a></h4>
                    <time>${dataFormatada} às ${item.hora}</time>
                </div>
            </div>
        `;
    });


    lastNoticiasContainer.innerHTML += lastNoticiasHTML;
}

function renderCategorias(data) {
    const allNoticias = "noticias.html";
    const listcat = document.getElementById("listcat");
    let categoriasHTML = "";
    
    for (const item in data){
        if (data.hasOwnProperty(item)){
            let valor = data[item];
            categoriasHTML += `
                <li>
                    <a href="${allNoticias}?categoria=${item}">${item}<span>(${valor})</span>
                    </a>
                </li>
            `
        }
    };

    listcat.innerHTML = categoriasHTML;

}
window.addEventListener('DOMContentLoaded', createLastNoticias);
