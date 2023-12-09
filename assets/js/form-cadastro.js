const urlAPI = 'https://apippgbio-or3c.vercel.app/carrousel-img';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ5ODZmZmEwYzMyOTFlMjA5MjE0OWIiLCJpYXQiOjE3MDExMDg5MTMsImV4cCI6MTcwMTExMjUxM30.Gh1MtYSYnbGJ_PoPlYrS7rjCchWH2dJj5uuqTK2GSpo";

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
                console.log(response.status);
                if (response.status === 401) {
                    Swal.fire({
                        titleText: "Ocorreu um erro ao salvar a imagem! ",
                        text: "Acesso não autorizado! ",
                        icon: "warning"
                    })
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                titleText: "Imagem enviada!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            }
            )
        })
        .catch(error => {
            Swal.fire({
                titleText: "Ocorreu um erro ao salvar a imagem! ",
                icon: "error"
            })
            console.error('Erro na solicitação fetch:', error);
        });

}

async function fetchThumbnails() {
    try {
        const response = await fetch('https://apippgbio-or3c-86czpr403-fer96carvalho.vercel.app/carrousel-img');
        const data = await response.json();

        // Chamada a função para exibir as miniaturas na página
        displayThumbnails(data);
        displayThumbnails2(data);
    } catch (error) {
        console.error('Erro ao buscar miniaturas:', error);
    }
}

function displayThumbnails(images) {
    const thumbnailContainer = document.getElementById('thumbnailContainer');

    images.forEach(image => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = 'Thumbnail';

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.classList.add('button-green');
        editButton.setAttribute("data-dismiss", "modal");

        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => showEditAlert(image._id));

        thumbnailDiv.appendChild(imgElement);
        thumbnailDiv.appendChild(editButton);
        thumbnailContainer.appendChild(thumbnailDiv);
    });
}

function displayThumbnails2(images) {
    const thumbnailContainer = document.getElementById('thumbnailContainer2');

    images.forEach(image => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = 'Thumbnail';

        const editButton = document.createElement('button');
        editButton.classList.add('del-button');
        editButton.classList.add('button-green');
        editButton.setAttribute("data-dismiss", "modal");

        editButton.textContent = 'Excluir';
        editButton.addEventListener('click', () => showDelAlert(image._id));

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
                    Swal.fire({
                        titleText: "Ocorreu um erro ao salvar a imagem! ",
                        icon: "error"
                    })
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Faça algo com os dados retornados
                console.log('Resposta:', data);
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

                        throw new Error(`HTTP error! Status: ${response.status}`);
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
                    Swal.fire({
                        titleText: "Ocorreu um erro ao excluir a imagem! ",
                        icon: "error"
                    })
                    console.error('Erro na solicitação fetch:', error);
                });
        }
    });

}

function showAllNoticesEdit() {
    const noticiasContainer = document.getElementById("showAllNotices");
    const noticiasSearch = document.getElementById("showSearchEditNotices");
    noticiasSearch.style.display = "none";

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
    jsonURL = "https://apippgbio-or3c.vercel.app/noticias";

    fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
    
      data.forEach(item =>{
        const dataFormatada = formatarData(item.data);
        noticiasHTML += `
            <div class="post-item cardNotice" data-aos="fade-up">
                <div>
                    <h5>${item.titulo}</h5>
                    <div class="d-flex column">
                        <div>
                            <time>${dataFormatada} às ${item.hora}</time>
                            <p>Editor: ${item.autor}</p>
                        </div>
                        <button id="btn-edit-cardNotice" type="button" onclick="" class="btn button-green">Editar</button>
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

    const divRender = document.getElementById("showSearchEditNotices");


    let noticiasSeachEdit = "";

    if (data) {
        data.forEach(item => {
            const dataFormatada = formatarData(item.data);
            noticiasSeachEdit += `
            <div class="post-item cardNotice" data-aos="fade-up">
                <div>
                    <h5>${item.titulo}</h5>
                    <div class="d-flex column">
                        <div>
                            <time>${dataFormatada} às ${item.hora}</time>
                            <p>Editor: ${item.autor}</p>
                        </div>
                        <button id="btn-edit-cardNotice" type="button" onclick="" class="btn button-green">Editar</button>
                    </div>
                </div>
            </div>
            `
        });
        divRender.innerHTML = noticiasSeachEdit;
        divRender.style.display = "flex";
    }
}

function btnEditNotice(){
    const divEditNotice = document.getElementById("sectionEditNotice");
    let div = document.getElementById('section-new-notice');
    divEditNotice.style.display = "flex";
    div.style.display = 'none';
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

function showNewNotice(){
    let div = document.getElementById('section-new-notice');
    const divEditNotice = document.getElementById("sectionEditNotice");
    div.style.display = 'flex';
    divEditNotice.style.display = "none";
    renderCategorias();
}

function renderCategorias() {
    const categorySelect = document.getElementById('categorySelect');
    const newCategoryInput = document.getElementById('newCategoryInput');
    const categoriesList = document.getElementById('categoriesList');
    const selectedCategories = [];

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
    fetch('https://apippgbio-or3c-86czpr403-fer96carvalho.vercel.app/noticias/categorias')
        .then(response => response.json())
        .then(data => {
            for (const category in data) {
                if (data.hasOwnProperty(category)) {
                    addOptionToSelect(category, category);
                }
            }
        });

    // Adicione uma opção para adicionar nova categoria
    addOptionToSelect('new', 'Nova Categoria');

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
        if (selectedCategories.length == 3){return}

        // Adicione a categoria selecionada ou nova ao array
        if (selectedCategory !== 'new' || newCategory) {
            selectedCategories.push(selectedCategory !== 'new' ? selectedCategory : newCategory);

            // Remova a opção selecionada do select
            if(selectedCategory !== 'new'){
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

// Inicializa o processo de busca e exibição de miniaturas
fetchThumbnails();