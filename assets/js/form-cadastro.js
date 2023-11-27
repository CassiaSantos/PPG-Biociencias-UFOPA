const urlAPI = 'https://apippgbio-or3c.vercel.app/carrousel-img';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ5ODZmZmEwYzMyOTFlMjA5MjE0OWIiLCJpYXQiOjE3MDEwMDEwMjQsImV4cCI6MTcwMTAwNDYyNH0.05Sz1DOG_4vs9CMiaug6y4jfa-ZIdm_xy0w-6sZODFk";

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
                    }).then((result) =>{
                        if (result.isConfirmed){
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

// Inicializa o processo de busca e exibição de miniaturas
fetchThumbnails();