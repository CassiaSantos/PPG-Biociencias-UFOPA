const urlAPI = 'https://apippgbio-or3c.vercel.app/carrousel-img';
const token = sessionStorage.getItem('token');

let autorNome = sessionStorage.getItem('autor');
let inputTitulo = '';
let inputImagemCapa = '';
let categoriasList = '';
let dataNoticia = '';
let dataFormatada = '';
let selectedCategories = [];
const categoriesList = document.getElementById('categoriesList');

let idNoticeUpdate = '';


function formatarData(dataString) {
    const meses = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro",
        "Outubro", "Novembro", "Dezembro"
    ];
    console.log(dataString);
    const data = new Date(`${dataString}T00:00:00-03:00`);

    console.log(data);
    const dia = data.getDate();
    console.log(dia);
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();

    return `${dia} de ${mes} de ${ano}`;
};

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike',],
    [{ 'script': 'super' }, { 'script': 'sub' }, 'blockquote', 'link'],
    [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['image']
]
var quill = new Quill('#editorQuil', {
    theme: 'snow',
    placeholder: 'Escreva a notícia aqui...',
    modules: {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: urlImage
            }
        }
    }
});

function newImgCarousel() {
    let inputUrl = document.getElementById("url-img-carrosel");
    let urlImg = inputUrl.value;
    let data = {
        url: urlImg
    }
    inputUrl.value = "";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
    };


    fetch(urlAPI, options)
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    Swal.fire({
                        titleText: "Token expirado!",
                        text: "Faça login novamente para obter acesso ao site.",
                        icon: "error"
                    });
                    throw new Error(`Erro ao salvar a imagem: ${response.statusText}`);
                } else {
                    Swal.fire({
                        titleText: "Ocorreu um erro ao salvar a imagem!",
                        text:"Tente novamente.",
                        icon: "error"
                    })
                    throw new Error('Erro na requisição');
                }
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                titleText: "Imagem enviada!",
                icon: "success"
            }).then((result) => {
                    window.location.reload();
            }
            )
        })
        .catch(error => {
            
            console.error('Erro na solicitação fetch:', error);
        });

}

async function fetchThumbnails() {
    try {
        const response = await fetch('https://apippgbio-or3c.vercel.app/carrousel-img');
        const data = await response.json();

        // Chamada a função para exibir as miniaturas na página
        displayThumbnails(data);
        displayThumbnails2(data);
    } catch (error) {
        console.error('Erro ao buscar miniaturas:', error);
    }
}

function displayThumbnails(data) {
    const thumbnailContainer = document.getElementById('thumbnailContainer');

    data.forEach(data => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = data.url;
        imgElement.alt = 'Thumbnail';

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.classList.add('button-green');
        editButton.setAttribute("data-dismiss", "modal");

        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => showEditAlert(data._id));

        thumbnailDiv.appendChild(imgElement);
        thumbnailDiv.appendChild(editButton);
        thumbnailContainer.appendChild(thumbnailDiv);
    });
}

function displayThumbnails2(data) {
    const thumbnailContainer = document.getElementById('thumbnailContainer2');

    data.forEach(data => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = data.url;
        imgElement.alt = 'Thumbnail';

        const editButton = document.createElement('button');
        editButton.classList.add('del-button');
        editButton.classList.add('button-green');
        editButton.setAttribute("data-dismiss", "modal");

        editButton.textContent = 'Excluir';
        editButton.addEventListener('click', () => showDelAlert(data._id));

        thumbnailDiv.appendChild(imgElement);
        thumbnailDiv.appendChild(editButton);
        thumbnailContainer.appendChild(thumbnailDiv);
    });
}


async function showEditAlert(id) {
    const { value: url } = await Swal.fire({
        titleText: "URL da imagem",
        input: "url",
        inputPlaceholder: "Insira a URL"

    });
    if (url) {
        let data = {
            id: id,
            newUrl: url
        };
        const options = {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data),
        };

        fetch(urlAPI, options)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        Swal.fire({
                            titleText: "Token expirado!",
                            text: "Faça login novamente para obter acesso ao site.",
                            icon: "error"
                        });
                        throw new Error(`Erro ao atualiza a imagem: ${response.statusText}`);
                    } else {
                        Swal.fire({
                            titleText: "Ocorreu um erro ao atualizar a imagem!",
                            text:"Tente novamente.",
                            icon: "error"
                        })
                        throw new Error('Erro na requisição');
                    }
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    titleText: "Imagem alterada!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                }
                )
            })
            .catch(error => {
                console.error('Erro na solicitação fetch:', error);
            });

    }
}

function showDelAlert(id) {
    const delAPI = urlAPI + "/" + id;
    Swal.fire({
        title: "Atenção",
        text: "Deseja excluir a imagem?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const options = {
                method: 'DELETE',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            fetch(delAPI, options)
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 401) {
                            Swal.fire({
                                titleText: "Token expirado!",
                                text: "Faça login novamente para obter acesso ao site.",
                                icon: "error"
                            });
                            throw new Error(`Erro ao excluir a imagem: ${response.statusText}`);
                        } else {
                            Swal.fire({
                                titleText: "Ocorreu um erro ao excluir a imagem!",
                                text:"Tente novamente.",
                                icon: "error"
                            })
                            throw new Error('Erro na requisição');
                        }
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Resposta:', data);
                    Swal.fire({
                        title: "Excluido!",
                        text: "A imagem foi excluida.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    })
                })
                .catch(error => {
                    
                    console.error('Erro na solicitação fetch:', error);
                });
        }
    });

}

function showAllNoticesEdit() {
    const noticiasContainer = document.getElementById("showAllNotices");
    const noticiasSearch = document.getElementById("showSearchEditNotices");
    noticiasSearch.style.display = "none";

    let noticiasHTML = "";
    jsonURL = "https://apippgbio-or3c.vercel.app/noticias";

    fetch(jsonURL)
        .then((response) => response.json())
        .then((data) => {

            data.forEach(item => {
                const dataFormatada = formatarData(item.data);
                let data = item;
                noticiasHTML += `
            <div class="post-item cardNotice" >
                <div>
                    <h5>${item.titulo}</h5>
                    <div class="d-flex column">
                        <div>
                            <time>${dataFormatada} às ${item.hora}</time>
                            <p>Editor: ${item.autor}</p>
                        </div>
                        <button id="btn-edit-cardNotice" type="button" onclick="editQuillNotice('${item._id}')" class="btn button-green">Editar</button>
                    </div>
                </div>
            </div>
        `;
            })


            noticiasContainer.innerHTML = noticiasHTML;
            noticiasContainer.style.display = "flex";


        })
        .catch((error) => console.error("Erro ao carregar o JSON: ", error));
}

function renderNoticesSearchEdit(data) {
    const divAllNotices = document.getElementById("showAllNotices");
    divAllNotices.style.display = "none";
    

    const divRender = document.getElementById("showSearchEditNotices");


    let noticiasSeachEdit = "";

    if (data) {
        data.forEach(item => {
            const dataFormatada = formatarData(item.data);
            noticiasSeachEdit += `
            <div class="post-item cardNotice" >
                <div>
                    <h5>${item.titulo}</h5>
                    <div class="d-flex column">
                        <div>
                            <time>${dataFormatada} às ${item.hora}</time>
                            <p>Editor: ${item.autor}</p>
                        </div>
                        <button id="btn-edit-cardNotice" type="button" onclick="editQuillNotice('${item._id}')" class="btn button-green">Editar</button>
                    </div>
                </div>
            </div>
            `
        });
        divRender.innerHTML = noticiasSeachEdit;
        divRender.style.display = "flex";
    }
}

function btnEditNotice() {
    const divEditNotice = document.getElementById("sectionEditNotice");
    const divDelNotice = document.getElementById("sectionDelNotice");

    let div = document.getElementById('section-new-notice');
    divEditNotice.style.display = "flex";
    div.style.display = 'none';
    divDelNotice.style.display = "none";
}

async function searchNoticeByTitle2(event) {

    event.preventDefault();
    const searchInput = document.getElementById("search-notice-edit");
    const searchInputValue = document.getElementById("search-notice-edit").value;



    await fetch(`https://apippgbio-or3c.vercel.app/noticias/titulo/${searchInputValue}`)
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
            searchInput.value = "";
            renderNoticesSearchEdit(data);
        })
        .catch(error => {
            console.error('Erro na requisição:', error.message);
        });
}

function showNewNotice(data) {

    function renderSelectedCategories() {
        categoriesList.innerHTML = selectedCategories.map(category => `<li>${category}</li><button style="margin: 2px; width: 50%; color: white; background-color: var(--color-primary); border-radius:0.25rem; border: none" onmouseover="this.style.backgroundColor='var(--color-tertiary)'"
        onmouseout="this.style.backgroundColor= 'var(--color-primary)'"  class="delete-btn" data-category="${category}">Excluir</button>`).join('');

        // Adicione um ouvinte de evento para os botões de exclusão
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const categoryToRemove = this.getAttribute('data-category');
                // Remova a categoria do array
                const index = selectedCategories.indexOf(categoryToRemove);
                if (index !== -1) {
                    selectedCategories.splice(index, 1);
                }
                // Adicione a opção de volta ao select
                addOptionToSelect(categoryToRemove, categoryToRemove);
                // Exiba as categorias atualizadas
                renderSelectedCategories();
            });
        });
    }

    inputTitulo.value = '';
    inputImagemCapa.value = '';
    categoriasList.value = '';
    dataNoticia = '';
    dataFormatada = '';
    selectedCategories = [];

    categoriesList.innerHTML = "";
    quill.setText('');
    if (data) {
        quill.clipboard.dangerouslyPasteHTML(data.texto);
        inputTitulo = document.getElementById("titulo-noticia");
        inputImagemCapa = document.getElementById("imagem-noticia");
        inputTitulo.value = data.titulo;
        inputImagemCapa.value = data.imagem;
        categoriasList.value = '';
        dataNoticia = data.data;
        dataFormatada = formatarData(data.data);
        selectedCategories = data.categorias;
        renderSelectedCategories();
        idNoticeUpdate = data._id;
        console.log(idNoticeUpdate);
    }




    let div = document.getElementById('section-new-notice');
    const divEditNotice = document.getElementById("sectionEditNotice");
    const divDelNotice = document.getElementById("sectionDelNotice");
    div.style.display = 'flex';
    divEditNotice.style.display = "none";
    divDelNotice.style.display = "none";
    renderCategorias();


}

function renderCategorias() {
    const categorySelect = document.getElementById('categorySelect');
    const newCategoryInput = document.getElementById('newCategoryInput');

    // Função para adicionar opção ao select
    function addOptionToSelect(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        categorySelect.appendChild(option);
    }

    // Função para remover opção do select
    function removeOptionFromSelect(value) {
        const optionToRemove = categorySelect.querySelector(`option[value="${value}"]`);
        if (optionToRemove) {
            categorySelect.removeChild(optionToRemove);
        }
    }

    // Adicione as opções ao menu suspenso
    fetch('https://apippgbio-or3c.vercel.app/noticias/categorias')
        .then(response => response.json())
        .then(data => {
            for (const category in data) {
                if (data.hasOwnProperty(category)) {
                    let optionExist = categorySelect.querySelector(`option[value=${category}]`)
                    if (!optionExist) { addOptionToSelect(category, category) }
                }
            }
        });

    // Adicione uma opção para adicionar nova categoria
    let optionExist = categorySelect.querySelector(`option[value='new']`);
    if (!optionExist) { addOptionToSelect('new', 'Nova Categoria') }

    // Adicione um ouvinte de evento ao formulário
    const categorySubmit = document.getElementById('categorySubmit');
    categorySubmit.addEventListener('click', function (event) {
        event.preventDefault();

        // Obtenha o valor selecionado
        const selectedCategory = categorySelect.value;

        // Se a opção selecionada for 'new', use a nova categoria digitada
        const newCategoryValue = newCategoryInput.value;
        const newCategory = (selectedCategory === 'new' && newCategoryValue) ? newCategoryValue : null;

        // Limitando a quantidade de categorias
        console.log(selectedCategories.length)
        if (selectedCategories.length == 3) { return }

        // Adicione a categoria selecionada ou nova ao array
        if (selectedCategory !== 'new' || newCategory) {
            selectedCategories.push(selectedCategory !== 'new' ? selectedCategory : newCategory);

            // Remova a opção selecionada do select
            if (selectedCategory !== 'new') {
                removeOptionFromSelect(selectedCategory);
            }
        }


        // Exiba as categorias selecionadas
        renderSelectedCategories();

        // Limpe o formulário (opcional)
        newCategoryInput.value = "";
    });

    // Função para renderizar categorias selecionadas
    function renderSelectedCategories() {
        categoriesList.innerHTML = selectedCategories.map(category => `<li>${category}</li><button style="margin: 2px; width: 50%; color: white; background-color: var(--color-primary); border-radius:0.25rem; border: none" onmouseover="this.style.backgroundColor='var(--color-tertiary)'"
        onmouseout="this.style.backgroundColor= 'var(--color-primary)'"  class="delete-btn" data-category="${category}">Excluir</button>`).join('');

        // Adicione um ouvinte de evento para os botões de exclusão
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const categoryToRemove = this.getAttribute('data-category');
                // Remova a categoria do array
                const index = selectedCategories.indexOf(categoryToRemove);
                if (index !== -1) {
                    selectedCategories.splice(index, 1);
                }
                // Adicione a opção de volta ao select
                addOptionToSelect(categoryToRemove, categoryToRemove);
                // Exiba as categorias atualizadas
                renderSelectedCategories();
            });
        });
    }

}



async function urlImage() {
    let mousePosition = this.quill.getSelection();
    const { value: url } = await Swal.fire({
        input: "text",
        inputLabel: "URL da Imagem",
        inputPlaceholder: "Digite a URL"
    });
    if (url === null) { return };
    this.quill.insertEmbed(mousePosition.index, 'image', url);

}

function dataQuill() {
    let data = quill.root.innerHTML;
    console.log(data);
    return data;
}

function previewNotice() {



    inputTitulo = document.getElementById("titulo-noticia");
    inputImagemCapa = document.getElementById("imagem-noticia");
    categoriasList = (selectedCategories.length > 0 ? selectedCategories : ["Categoria não definida"]);
    dataNoticia = new Date();
    dataFormatada = formatarData(dataNoticia);

    var horas = dataNoticia.getHours();
    var minutos = dataNoticia.getMinutes();


    // Formate a hora conforme necessário (por exemplo, adicione zeros à esquerda para garantir dois dígitos)
    horas = (horas < 10) ? "0" + horas : horas;
    minutos = (minutos < 10) ? "0" + minutos : minutos;

    // Crie uma string representando a hora atual no formato HH:MM:SS
    var horaAtual = horas + ":" + minutos + "h";


    let divRender = document.getElementById("previewNotice");

    let htmlRender = `
    <article class="blog-details ml-5 mr-5">
      <div class="post-img">
        <img src="${inputImagemCapa.value}" alt="" class="img-fluid">
      </div>
      <h2 class="title">${inputTitulo.value}</h2>
      <div class="meta-top">
        <ul>
          <li class="d-flex align-items-center"><i class="bi bi-bookmarks-fill"></i> <a href="blog.html?categoria=${categoriasList[0]}">${categoriasList[0]}</a></li>
          <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a><time datetime="${dataNoticia}">${dataFormatada} às ${horaAtual}</time></a></li>
        </ul>
      </div>
      <div class="content" id="noticeRenderHtml">
      </div>
    </article>
    `;

    divRender.innerHTML = htmlRender;

    let conteudoNotice = document.getElementById("noticeRenderHtml");
    conteudoNotice.innerHTML = dataQuill();

}

function editQuillNotice(id) {
    // URL específica para buscar os dados pelo id
    const url = `https://apippgbio-or3c.vercel.app/noticia/id/${id}`;


    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Dados específicos para o ID:", data);
            showNewNotice(data);
        })
        .catch((error) => console.error("Erro ao carregar dados específicos: ", error));
}

function salvarNoticia() {
    inputTitulo = document.getElementById("titulo-noticia");
    inputImagemCapa = document.getElementById("imagem-noticia");
    var hora = new Date();
    var horaH = hora.getHours();
    var horaM = hora.getMinutes();
    horaH = (horaH < 10) ? "0" + horaH : horaH;
    horaM = (horaM < 10) ? "0" + horaM : horaM;
    let horaAtual = horaH + ":" + horaM;

    var dataP = new Date();
    var ano = dataP.getFullYear();
    var mes = (dataP.getMonth() + 1).toString().padStart(2, '0');
    var dia = dataP.getDate().toString().padStart(2, '0'); 

    let dataFormatada = ano + '-' + mes + '-' + dia;

    let data = {
        data: dataFormatada,
        hora: horaAtual,
        titulo: inputTitulo.value,
        categorias: selectedCategories,
        imagem: inputImagemCapa.value,
        texto: dataQuill(),
        autor: autorNome,
    }

    const urlNew = 'https://apippgbio-or3c.vercel.app/noticia/new';
    const requestOptionsNew = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
    };

    const urlUp = `https://apippgbio-or3c.vercel.app/noticia/id/${idNoticeUpdate}`;
    const requestOptionsUp = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
    }

    if (idNoticeUpdate) {
        fetch(urlUp, requestOptionsUp)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        Swal.fire({
                            titleText: "Token expirado!",
                            text: "Faça login novamente para obter acesso ao site.",
                            icon: "error"
                        });
                        throw new Error(`Erro ao atualizar a notícia: ${response.statusText}`);
                    } else {
                        Swal.fire({
                            titleText: "Ocorreu um erro ao atualizar a notícia!",
                            text:"Tente novamente.",
                            icon: "error"
                        })
                        throw new Error('Erro na requisição');
                    }

                }
                return response.json();
            })
            .then(data => {
                console.log('Notícia Atualizada com sucesso:', data);
                Swal.fire({
                    titleText: "A notícia foi atualizada!",
                    icon: "success"
                }).then((result) => {
                    
                        window.location.reload();
                })
            })
            .catch(error => {
                console.error('Erro durante a solicitação de salvamento da notícia:', error);
                
            });
    } else {
        fetch(urlNew, requestOptionsNew)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        Swal.fire({
                            titleText: "Token expirado!",
                            text: "Faça login novamente para obter acesso ao site.",
                            icon: "error"
                        });
                        throw new Error(`Erro ao salvar notícia: ${response.statusText}`);
                    } else {
                        Swal.fire({
                            titleText: "Ocorreu um erro ao salvar a notícia!",
                            text:"Tente novamente.",
                            icon: "error"
                        })
                        throw new Error('Erro na requisição');
                    }
                }
                return response.json();
            })
            .then(data => {
                console.log('Notícia salva com sucesso:', data);

                Swal.fire({
                    titleText: "A notícia foi salva!",
                    icon: "success"
                }).then((result) => {
                    
                        window.location.reload();
                })
                
            })
            .catch(error => {
                console.error('Erro durante a solicitação de salvamento da notícia:', error);
                
                
            });
    }

}

function showAllNoticesDel() {
    const noticiasContainer = document.getElementById("showAllNotices2");
    const noticiasSearch = document.getElementById("showSearchDelNotices");
    noticiasSearch.style.display = "none";

    let noticiasHTML = "";
    jsonURL = "https://apippgbio-or3c.vercel.app/noticias";

    fetch(jsonURL)
        .then((response) => response.json())
        .then((data) => {

            data.forEach(item => {
                const dataFormatada = formatarData(item.data);
                let data = item;
                noticiasHTML += `
            <div class="post-item cardNotice" >
                <div>
                    <h5>${item.titulo}</h5>
                    <div class="d-flex column">
                        <div>
                            <time>${dataFormatada} às ${item.hora}</time>
                            <p>Editor: ${item.autor}</p>
                        </div>
                        <button id="btn-edit-cardNotice" type="button" onclick="showDelNoticeAlert('${item._id}')" class="btn button-green">Excluir</button>
                    </div>
                </div>
            </div>
        `;
            })


            noticiasContainer.innerHTML = noticiasHTML;
            noticiasContainer.style.display = "flex";


        })
        .catch((error) => console.error("Erro ao carregar o JSON: ", error));
}

function showDelNoticeAlert(id) {
    const delAPI = `https://apippgbio-or3c.vercel.app/noticia/${id}`;
    const delAPIL = `http://localhost:3000/noticia/${id}`;

    Swal.fire({
        title: "Atenção",
        text: "Deseja excluir a notícia?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const options = {
                method: 'DELETE',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            fetch(delAPI, options)
                .then(response => {
                    if (!response.ok) {

                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Resposta:', data);
                    Swal.fire({
                        title: "Excluido!",
                        text: "A notícia foi excluida!",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    })
                })
                .catch(error => {
                    Swal.fire({
                        titleText: "Ocorreu um erro ao excluir a notícia! ",
                        icon: "error"
                    })
                    console.error('Erro na solicitação fetch:', error);
                });
        }
    });

}

function renderNoticesSearchDel(data) {
    const divAllNotices = document.getElementById("showAllNotices2");
    divAllNotices.style.display = "none";
    

    const divRender = document.getElementById("showSearchDelNotices");


    let noticiasSeachEdit = "";

    if (data) {
        data.forEach(item => {
            const dataFormatada = formatarData(item.data);
            noticiasSeachEdit += `
            <div class="post-item cardNotice" >
                <div>
                    <h5>${item.titulo}</h5>
                    <div class="d-flex column">
                        <div>
                            <time>${dataFormatada} às ${item.hora}</time>
                            <p>Editor: ${item.autor}</p>
                        </div>
                        <button id="btn-edit-cardNotice" type="button" onclick="showDelNoticeAlert('${item._id}')" class="btn button-green">Excluir</button>
                    </div>
                </div>
            </div>
            `
        });
        divRender.innerHTML = noticiasSeachEdit;
        divRender.style.display = "flex";
    }
}

async function searchNoticeByTitle3(event) {

    event.preventDefault();
    const searchInput = document.getElementById("search-notice-del");
    const searchInputValue = document.getElementById("search-notice-del").value;



    await fetch(`https://apippgbio-or3c.vercel.app/noticias/titulo/${searchInputValue}`)
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
            searchInput.value = "";
            renderNoticesSearchDel(data);
        })
        .catch(error => {
            console.error('Erro na requisição:', error.message);
        });
}


function showDelNotice(){
    const sectionNemNotice = document.getElementById('section-new-notice');
    const divEditNotice = document.getElementById("sectionEditNotice");
    sectionNemNotice.style.display = 'none';
    divEditNotice.style.display = "none";
    const divDelNotice = document.getElementById("sectionDelNotice");
    divDelNotice.style.display = 'flex';
    console.log("Botão funcionando");

}


// Inicializa o processo de busca e exibição de miniaturas
fetchThumbnails();
