document.addEventListener("DOMContentLoaded", function() {
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
          <li><a href="#hero">Início</a></li>
          <li><a href="#about">Disciplinas</a></li>
          <li><a href="#services">Laboratórios</a></li>
          <li><a href="#team">Corpo Acadêmico</a></li>
          <li><a href="#">Teses</a></li>
          <li><a href="#">Documentos</a></li>
          <li><a href="#contact">Contato</a></li>
        </ul>
        </div>

        <div class="col-lg-2 col-6 footer-links">
          <h4> </h4>
          <ul>
            <li><a href="#hero">Início2</a></li>
            <li><a href="#about">Disciplinas2</a></li>
            <li><a href="#services">Laboratórios2</a></li>
            <li><a href="#team">Corpo Acadêmico2</a></li>
            <li><a href="#">Teses2</a></li>
            <li><a href="#">Documentos2</a></li>
            <li><a href="#contact">Contato2</a></li>
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
