
const teamSection = document.getElementById("div-prof");
let dados;

function preencherMembros() {
  const corpoAcademico = "https://apippgbio-or3c.vercel.app/corpo-academico";
  fetch(corpoAcademico)
    .then((response) => response.json())
    .then((data) => {
      dados = data;
      data.forEach((membro, index) => {
        const memberDiv = document.createElement("div");
        memberDiv.className = "col-xl-3 col-md-6 d-flex justify-content-center team";
        memberDiv.dataset.aos = "fade-up";
        memberDiv.dataset.aosDelay = 100 * (index + 1);

        memberDiv.innerHTML = `
          <div class="member" data-target="#memberModal">
            <img src="${membro.foto}" class="img-fluid" data-toggle="modal" data-index="${index}" onclick="abrirModal(this.getAttribute('data-index'))" alt=""/>          
            <h4>${membro.nomeCompleto}</h4>
            <span>${membro.cargo}</span>
            <div class="social">
              <a href="${membro.redesSociais.twitter}" target="_blank"><i class="bi bi-twitter"></i></a>
              <a href="${membro.redesSociais.facebook}" target="_blank"><i class="bi bi-facebook"></i></a>
              <a href="${membro.redesSociais.instagram}" target="_blank"><i class="bi bi-instagram"></i></a>
              <a href="${membro.redesSociais.linkedin}" target="_blank"><i class="bi bi-linkedin"></i></a>
            </div>
            <a href="${membro.curriculoLattes}" target="_blank" class="readmore">Currículo Lattes <i class="bi bi-arrow-right"></i></a>
          </div>
        `;

        teamSection.appendChild(memberDiv);
      });
    });
}

function abrirModal(index) {
  const membro = dados[index]; // Certifique-se de ter acesso à variável 'data'
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = membro.nomeCompleto;
  modalBody.innerHTML = `
    <img src="${membro.foto}" class="img-fluid" alt="">
    <span>Resumo profissional</span>
    <p>${membro.resumoPessoal}</p>
    <div class="social">
      <a href="${membro.redesSociais.twitter}" target="_blank"><i class="bi bi-twitter"></i></a>
      <a href="${membro.redesSociais.facebook}" target="_blank"><i class="bi bi-facebook"></i></a>
      <a href="${membro.redesSociais.instagram}" target="_blank"><i class="bi bi-instagram"></i></a>
      <a href="${membro.redesSociais.linkedin}" target="_blank"><i class="bi bi-linkedin"></i></a>
    </div>
    <div class="d-flex justify-content-center">
      <a href="${membro.curriculoLattes}" target="_blank" class="readmore">Currículo Lattes <i class="bi bi-arrow-right"></i></a>
    </div>
    
  `;

  // Abre o modal
  $('#memberModal').modal('show');
}

document.addEventListener("DOMContentLoaded", preencherMembros);

