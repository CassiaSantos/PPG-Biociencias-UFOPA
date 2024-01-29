document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footer-container");

  const footerHTML = `
  <!-- ======= Footer ======= -->
  <footer id="footer" class="footer">

    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-5 col-md-12 footer-info">
          <a href="index.html" class="logo d-flex align-items-center">
            <span>PPG Biociências</span>
          </a>
          <p>O programa de Pós-Graduação no coração da Amazônia, um tesouro verde. Um refúgio de biodiversidade inigualável. Um mundo de beleza e mistério, onde a natureza desabrocha em toda a sua exuberância, grandiosidade e problemas para serem solucionados.</p>
          <div class="social-links d-flex mt-4">
            <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
            <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>


        <div class="col-lg-2 col-6 footer-links">
          <h4>Quero ir para:</h4>
          <ul>
            <li><a href="index.html">Início</a></li>
            <li><a href="dissertacoesPPGBIO.html">Dissertações</a></li>
            <li><a href="corpoAcademico.html">Corpo Acadêmico</a></li>
            <li><a href="laboratoriosBioCiencias.html">Laboratórios</a></li>
            <li><a href="projetosPPGBIO.html">Projetos</a></li>
            <li><a href="noticias.html">Notícias</a></li>
            <li><a href="PS-PPGBIO.html">Processos seletivos</a></li>
          </ul>
        </div>
        
        <div class="col-lg-2 col-6 footer-links">
          <br><br>
          <ul>
            <li><a href="bolsasPPGBIO.html">Bolsas Institucionais</a></li>
            <li><a href="auxiliosPPGBIO.html">Auxílios Financeiros</a></li>
            <li><a href="regimentosPPGBIO.html">Regimento do curso</a></li>
            <li><a href="planoPedagogicoPPGBIO.html">PPC do curso</a></li>
            <li><a href="gradeCurricularPPGBIO.html">Grade Curricular</a></li>
            <li><a href="contato.html">Contato</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
          <h4>Contato:</h4>
          <a href="https://maps.app.goo.gl/VN2AQE2LxEf9uXhH8" target="_blank">
            <p>Prédio Bloco Modular Tapajós II</p>
            <p>Rua: Vera Paz - bairro Salé, 68040-255</p>
            <p>Santarém - Pará</p>
            <p>Brasil</p>
          </a>
          <br><br>

          <strong>Email:</strong> ppgbio@ufopa.edu.br<br>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="copyright">
        &copy; Copyright <strong><span>PPG Biociências</span></strong>. Todos os direitos reservados
      </div>
    </div>

  </footer>
  <!-- End Footer -->
  `;

  //Inserir o conteúdo do footer no elemento do container:
  footerContainer.innerHTML = footerHTML;
});
