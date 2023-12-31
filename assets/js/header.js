document.addEventListener("DOMContentLoaded", function () {
    // Seletor do elemento onde o cabeçalho será inserido
    const headerContainer = document.getElementById("header-container");

    // Conteúdo do cabeçalho
    const headerHTML = `

        <!-- <section id="topbar" class="topbar d-flex align-items-center">
            <div class="container d-flex justify-content-center">
                <div class="contact-info d-flex align-items-center">
                    <i class="bi bi-envelope d-flex align-items-center"><a  href="mailto:ppgbio@ufopa.edu.br">e-mail: ppgbio@ufopa.edu.br</a></i>
                </div>
                div class="social-links d-none d-md-flex align-items-center">
                    <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                    <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                    <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                    <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></i></a>
                </div>
            </div>
        </section>  End Top Bar -->

        <header id="header" class="header d-flex align-items-center">
            <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
                <a href="index.html" class="logo d-flex align-items-center">
                    <!-- <img src="assets/img/logoBio.png" alt="logo do site do mestrado"> -->
                    <h1>PPG <span>Biociências</span></h1>
                </a>

                <nav id="navbar" class="navbar">
                    <ul>
                        <li><a href="index.html">Início</a></li>
                        <li class="dropdown"><a href="#"><span>Institucional</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                            <ul>
                                <li><a href="disciplinasPPGBIO.html">Disciplinas</a></li>
                                <li><a href="corpoAcademico.html">Corpo acadêmico</a></li>
                                <li><a href="laboratoriosBioCiencias.html">Laboratórios</a></li>
                                <li><a href="projetosPPGBIO.html">Projetos</a></li>
                            </ul>
                        </li>
                        <li><a href="blog.html">Notícias</a></li>

                        <li class="dropdown"><a href="#"><span>Editais</span><i class="bi bi-chevron-down dropdown-indicator"></i></a>
                            <ul>
                                <li><a href="PS-PPGBIO.html">Processos seletivos</a></li>
                                <li><a href="bolsasPPGBIO.html">Bolsas Institucionais</a></li>
                                <li><a href="auxiliosPPGBIO.html">Auxílios Financeiros</a></li>
                            </ul>
                        </li>

                        <!--Menu dropdown-->
                        <li class="dropdown"><a href="#"><span>Documentos</span><i class="bi bi-chevron-down dropdown-indicator"></i></a>
                            <ul>
                                <li><a href="regimentosPPGBIO.html">Regimento do Curso</a></li>
                                <li><a href="planoPoliticoDoCursoPPGBIO.html">PPC do curso</a></li>
                                <li><a href="dissertacoesPPGBIO.html">Dissertações</a></li>
                                <li><a href="gradeCurricularPPGBIO.html">Grade Curricular</a></li>
                                <li><a href="formulariosPPGBIO.html">Formulários</a><li>
                            </ul>
                        <li><a href="contato.html">Contato</a></li>
                    </ul>
                </nav><!-- end navbar -->

                <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
                <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

            </div>
        </header>
    `;

    // Inserir o conteúdo do cabeçalho no elemento de container
    headerContainer.innerHTML = headerHTML;
});