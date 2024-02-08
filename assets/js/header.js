document.addEventListener("DOMContentLoaded", function () {
    // Seletor do elemento onde o cabeçalho será inserido
    const headerContainer = document.getElementById("header-container");

    // Conteúdo do cabeçalho
    const headerHTML = `
    
        <div id="topo-ufopa" class="d-flex flex-column ">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-2 col-sm-2 col-xs-4">
                        <a href="http://www.ufopa.edu.br">
                        <img id="logomarca" src=" assets/img/logoUFOPA.png " class="img-responsive" title="Universidade Federal do Oeste do Pará" alt="Brasão da Universidade Federal do Oeste do Pará"/>
                        </a>
                    </div>
                    <div class="col-sm-8 col-xs-4 d-flex align-items-center">
                        <h1 class="titulo-ufopa hidden-xs">Universidade Federal do Oeste do Pará</h1>
                    </div>
                </div>
            </div>
        </div>

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
                                <li><a href="corpoAcademico.html">Corpo acadêmico</a></li>
                                <li><a href="laboratoriosBioCiencias.html">Laboratórios</a></li>
                                <li><a href="dissertacoesPPGBIO.html">Dissertações</a></li>                                <li><a href="projetosPPGBIO.html">Projetos</a></li>
                            </ul>
                        </li>
                        <li><a href="noticias.html">Notícias</a></li>

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
                                <li><a href="planoPedagogicoPPGBIO.html">PPC do curso</a></li>
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