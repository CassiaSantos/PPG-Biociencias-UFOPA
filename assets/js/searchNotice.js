function searchNoticeByTitle(searchTerm) {
    const searchInput = document.getElementById("search-notice");
    
  
    // Certifique-se de ajustar a URL da API de busca de notícias por título
    const jsonURL = `http://localhost:3000/noticias-titulo/${searchTerm}`;
  
    fetch(jsonURL)
      .then((response) => response.json())
      .then((data) => {
        // Processar os dados da notícia encontrada, por exemplo, exibir na página
        if (data.length > 0) {
          const foundNotice = data[0]; // Supondo que apenas uma notícia será retornada
          // Exibir ou manipular a notícia encontrada conforme necessário
          console.log(foundNotice);
        } else {
          // Caso a notícia não seja encontrada, você pode exibir uma mensagem ou realizar outra ação apropriada
          console.log("Notícia não encontrada");
        }
      })
      .catch((error) => console.error("Erro ao buscar notícia por título: ", error));
  }
  