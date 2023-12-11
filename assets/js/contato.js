document.addEventListener("DOMContentLoaded", function () {
    // Seletor do elemento onde o cabeçalho será inserido
    const contactContainer = document.getElementById("contact-container");

    // Conteúdo do cabeçalho
    const contactHTML = `

    <!-- ======= Contact Section ======= -->

    <div class="breadcrumbs">
        <div class="page-header d-flex align-items-center">
            <div class="container position-relative">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-6 text-center">
                        <h2><span>Contato</span></h2>
                        <p>Ficou com alguma dúvida ou tem algo para compartilhar conosco? Veja abaixo nosso endereço, e-mail e formulário de contato e sinta-se a vontade para escolher a melhor opção para você!</p>                            
                    </div>
                </div>
            </div>
        </div>
    </div><!-- End Breadcrumbs -->

    <section id="contact" class="contact">
        <div class="container" data-aos="fade-up">
            <div class="row gx-lg-0 gy-4">
      
                <div class="col-lg-4">
      
                    <div class="info-container d-flex flex-column align-items-center justify-content-center">
                        <div class="info-item d-flex">
                            <i class="bi bi-geo-alt flex-shrink-0"></i>
                            <div>
                                <h4>Localização:</h4>
                                <p>Rua: Vera Paz, bairro Salé, BMT II - sala 147</p>
                            </div>
                        </div><!-- End Info Item -->
          
                        <div class="info-item d-flex">
                            <i class="bi bi-envelope flex-shrink-0"></i>
                            <div>
                                <h4>Email:</h4>
                                <p>ppgbio@ufopa.edu.br</p>
                            </div>
                        </div><!-- End Info Item -->
          
                        <div class="info-item d-flex">
                            <i class="bi bi-clock flex-shrink-0"></i>
                            <div>
                                <h4>Secretaria:</h4>
                                <p>segunda a sexta-feira: 09:00 AM - 17:00 PM</p>
                            </div>
                        </div><!-- End Info Item -->
                    </div>
                </div>
  
                <!-- Formulário de contato -->
                <div class="col-lg-8">
                    <form action="https://formsubmit.co/cassia.oliveira.profissional@gmail.com" method="POST" class="contact-form">
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <input type="text" name="nome" class="form-control" id="name" placeholder="Seu nome completo" required>
                            </div>
                            <div class="col-md-6 form-group mt-3 mt-md-0">
                                <input type="email" class="form-control" name="email" id="email" placeholder="Seu Email" required>
                            </div>
                        </div>

                        <div class="form-group mt-3">
                            <input type="text" class="form-control" name="_subject" id="subject" placeholder="Assunto da mensagem" required>
                        </div>
                          
                        <div class="form-group mt-3">
                            <textarea class="form-control" name="mensagem" rows="7" placeholder="Escreva sua mensagem para nós aqui" required></textarea>
                        </div>

                        <div class="text-center phcontact-form"><button type="submit">Enviar mensagem</button></div>

                        <input type="hidden" name="_captcha" value="true">
                        <input type="text" name="_honey" style="display:none">
                          
                        <!--Página de obrigado!-->
                        <input type="hidden" name="_next" value="https://cassiasantos.github.io/PPG-Biociencias-UFOPA/agradecimento.html">
                    </form>
                </div><!-- Fim do formulário de contato -->
            </div>
        </div>
    </section><!-- End Contact Section -->
    `; 
  //Inserir o conteúdo do footer no elemento do container:
  contactContainer.innerHTML = contactHTML;
  
});
