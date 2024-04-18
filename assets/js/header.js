document.addEventListener("DOMContentLoaded", function () {
  // Seletor do elemento onde o cabeçalho será inserido
  const headerContainer = document.getElementById("header-container");

  // Conteúdo do cabeçalho
  const headerHTML = `
<div>
<div id="acessibilidade" class="hidden-xs">
<div class="containe">
    <div class="row p-2" style="width:100%">
        <div class="col-sm-12">
            <ul class="nav nav-pills">
                <li>
                    <a accesskey="1" href="#irconteudo" id="link-informe">Ir para o conteúdo <span>[1]</span></a>
                </li>
                <li>
                    <a accesskey="2" href="#menu" id="link-nav">Ir para o menu <span>[2]</span></a>
                </li>
                <li>
                    <a accesskey="3" href="#busca" id="link-busca">Ir para a busca <span>[3]</span></a>
                </li>
                <li>
                    <a accesskey="4" href="#rodape" id="link-rodape">Ir para o rodapé <span>[4]</span></a>
                </li>
            </ul>
        </div>
    </div>
</div>
</div>
<div id="barra-brasil" class="hidden-xs">
<div id="wrapper-barra-brasil">
    <div class="brasil-flag">
        <a href="https://gov.br" class="link-barra">Brasil</a>
    </div>
    <nav>
        <ul id="lista-barra-brasil" class="list">
            <li>
                <a href="#" id="menu-icon"></a>
            </li>
            <li class="list-item">
                <a href="http://www.gov.br/economia/pt-br/canais_atendimento/ouvidoria/simplifique"
                    class="link-barra">Simplifique!</a>
            </li>
            <li class="list-item">
                <a href="https://www.gov.br/secom/pt-br/acesso-a-informacao/comunicabr/"
                    class="link-barra">Comunica BR</a>
            </li>
            <li class="list-item"><a href="https://www.gov.br/pt-br/participacao-social/"
                    class="link-barra">Participe</a></li>
            <li class="list-item"><a href="http://www.gov.br/acessoainformacao/" class="link-barra">Acesso à
                    informação</a></li>
            <li class="list-item"><a href="http://www.planalto.gov.br/legislacao"
                    class="link-barra">Legislação</a></li>
            <li class="list-item last last-item"><a href="https://gov.br/pt-br/canais-do-executivo-federal"
                    class="link-barra">Canais</a></li>
        </ul>
    </nav>
    <span id="brasil-vlibras">
        <a class="logo-vlibras" id="logovlibras" href="#"></a>
        <span class="link-vlibras">
            <img src="//barra.brasil.gov.br/imagens/vlibras.gif" class="barralazy"
                data-src="//barra.brasil.gov.br/imagens/vlibras.gif" width="132" height="116">
            &nbsp;
            <br>
            O conteúdo desse portal pode ser acessível em Libras usando o
            <a href="http://www.vlibras.gov.br">VLibras</a>
        </span>
    </span>
    <script defer="defer" src="//barra.brasil.gov.br/barra.js"></script>
</div>
</div>

</div>

<header id="topo-ufopa">
    <div class="container-xl">
        <div class="banner">
            <div class="col-md-2 col-sm-2 col-xs-4 minwdth-logo">
                <a href="http://www.ufopa.edu.br">
                    <img id="logomarca" src="assets/img/logoUFOPA.png" class="img-fluid"
                        title="Universidade Federal do Oeste do Pará"
                        alt="Brasão da Universidade Federal do Oeste do Pará">
                </a>
            </div>
            <div class="col-sm-8 col-xs-4 d-flex minwdth">
                <h1 class="titulo-ufopa hidden-xs">Universidade Federal do Oeste do Pará</h1>
                <h1 class="titulo-ufopa visibile-xs">Ufopa</h1>                   
            </div>
            <div class="col-sm-2 busca col-xs-4 minwdth">
                <form action="https://www.ufopa.edu.br/ufopa/@@search/" method="GET">
                    <div class="form-group">
                        <label title="Buscar por" for="tx-search"></label>
                        <input title="Buscar por" type="text" autofocus="true" autocomplete="off"
                            class="thim-s form-control courses-search-input" placeholder="Buscar por" name="search"
                            value="" id="tx-search">
                        <button type="submit" value="Subscribe"><i class="bi bi-search"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</header>

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
