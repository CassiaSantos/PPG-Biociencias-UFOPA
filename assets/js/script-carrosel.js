function createCarousel() {
  const carouselContainer = document.getElementById("carousel");
  const indicatorsContainer = document.getElementById("carousel-indicators");
  // Alterar posteriormente a URL para a API
  const jsonURL = "https://apippgbio-or3c-86czpr403-fer96carvalho.vercel.app/carrousel-img"; 

  fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {
        const image = document.createElement("img");
        image.className = "d-block w-100 glightbox";
        image.src = item.url;

        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item";
        if (index === 0) {
          carouselItem.classList.add("active");
        }
        carouselItem.appendChild(image);

        const indicator = document.createElement("li");
        indicator.setAttribute("data-target", "#carouselExampleIndicators");
        indicator.setAttribute("data-slide-to", index);
        if (index === 0) {
          indicator.classList.add("active");
        }

        indicatorsContainer.appendChild(indicator);
        carouselContainer.appendChild(carouselItem);
      });
    })
    .catch((error) => console.error("Erro ao carregar o JSON: ", error));
}
window.addEventListener('DOMContentLoaded', createCarousel);
