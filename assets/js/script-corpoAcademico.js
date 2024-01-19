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
                <a href="${membro.redesSociais.twitter}"><i class="bi bi-twitter"></i></a>
                <a href="${membro.redesSociais.facebook}"><i class="bi bi-facebook"></i></a>
                <a href="${membro.redesSociais.instagram}"><i class="bi bi-instagram"></i></a>
                <a href="${membro.redesSociais.linkedin}"><i class="bi bi-linkedin"></i></a>
              </div>
              <a href="${membro.curriculoLattes}" class="readmore">Currículo Lattes <i class="bi bi-arrow-right"></i></a>
            </div>
          `;

        teamSection.appendChild(memberDiv);
      });
    })

}

document.addEventListener("DOMContentLoaded", preencherMembros);
