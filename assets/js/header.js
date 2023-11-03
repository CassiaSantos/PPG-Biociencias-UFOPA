document.addEventListener("DOMContentLoaded", function () {
    // Seletor do elemento onde o cabeçalho será inserido
    const headerContainer = document.getElementById("header-container");

    // Conteúdo do cabeçalho
    const headerHTML = `
        <section id="topbar" class="topbar d-flex align-items-center">
            <div class="container d-flex justify-content-center justify-content-md-between">
                <div class="contact-info d-flex align-items-center">
                    <i class="bi bi-envelope d-flex align-items-center"><a  href="mailto:ppgbio@ufopa.edu.br">e-mail: ppgbio@ufopa.edu.br</a></i>
                </div>
                <div class="social-links d-none d-md-flex align-items-center">
                    <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                    <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                    <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                    <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></i></a>
                </div>
            </div>
        </section><!-- End Top Bar -->

        <header id="header" class="header d-flex align-items-center">
            <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
                <a href="index.html" class="logo d-flex align-items-center">
                    <!-- Uncomment the line below if you also wish to use an image logo -->
                    <!-- <img src="assets/img/logo.png" alt=""> -->
                    <h1>PPG <span>Biociências</span></h1>
                </a>

                <nav id="navbar" class="navbar">
                    <ul>
                        <li><a href="index.html">Início</a></li>
                        <li><a href="#">Disciplinas</a></li>
                        <li><a href="laboratoriosBioCiencias.html">Laboratórios</a></li>
                        <li class="dropdown"><a href="corpoAcademico.html"><span>Corpo acadêmico</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                            <ul>
                                <li><a href="#">Coordenação</a></li>
                                <li><a href="#">Colegiado</a></li>
                                <li><a href="#">Docentes</a></li>
                                <li><a href="#">Discentes</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Dissertações</a></li>
                        <!--Menu dropdown-->
                        <li class="dropdown"><a href="#"><span>Documentos</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                            <ul>
                                <li><a href="regimentosPPGBIO.html">Regimento do Curso</a></li>
                                <li><a href="#">PPC do curso</a></li>
                                <li><a href="#">Grade Curricular</a></li>
                                <li class="dropdown"><a href="#"><span>Editais</span><i class="bi bi-chevron-down dropdown-indicator"></i></a>
                                    <ul>
                                        <li><a href="PS-PPGBIO.html">Processos seletivos</a></li>
                                        <li><a href="">Bolsas</a></li>
                                        <li><a href="">Auxílios</a></li>
                                    </ul>
                            </ul>
                        <li><a href="contato.html">Contato</a></li>
                    </ul>
                </nav><!-- end navbar -->

                <!--<i class="mobile-nav-toggle mobile-nav-show bi bi-list" onclick="viewNavbar()"></i>-->
                <!--<i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" onclick="closedNavbar()"></i>-->

            </div>
        </header>
    `;

    // Inserir o conteúdo do cabeçalho no elemento de container
    headerContainer.innerHTML = headerHTML;
});