const teamSection = document.getElementById("div-prof");

function preencherMembros() {
  const corpoAcademico = "https://apippgbio-or3c.vercel.app/corpo-academico";
  fetch(corpoAcademico)
    .then((response) => response.json())
    .then((data) => {
      data.slice(0, 4).forEach((membro, index) => {
        const memberDiv = document.createElement("div");
        memberDiv.className = "col-xl-3 col-md-6 d-flex justify-content-center ";
        memberDiv.dataset.aos = "fade-up";
        memberDiv.dataset.aosDelay = 100 * (index + 1);

        memberDiv.innerHTML = `
            <div class="member" >
              <img src="${membro.foto}" class="img-fluid" alt="">
              <h4>${membro.nomeCompleto}</h4>
              <span>${membro.cargo}</span>
              <div class="social">
                ${membro.redesSociais.twitter ? `<a href="${membro.redesSociais.twitter}" target="_blank"><i class="bi bi-twitter"></i></a>` : ''}
                ${membro.redesSociais.facebook ? `<a href="${membro.redesSociais.facebook}" target="_blank"><i class="bi bi-facebook"></i></a>` : ''}
                ${membro.redesSociais.instagram ? `<a href="${membro.redesSociais.instagram}" target="_blank"><i class="bi bi-instagram"></i></a>` : ''}
                ${membro.redesSociais.linkedin ? `<a href="${membro.redesSociais.linkedin}" target="_blank"><i class="bi bi-linkedin"></i></a>` : ''}
              </div>
              <a href="${membro.curriculoLattes}" class="readmore">Currículo Lattes <i class="bi bi-arrow-right"></i></a>
            </div>
          `;

        teamSection.appendChild(memberDiv);
      });
    })

}

document.addEventListener("DOMContentLoaded", preencherMembros);
