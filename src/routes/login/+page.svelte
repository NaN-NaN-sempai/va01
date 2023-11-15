<script>
    import BlockPanel from '$components/BlockPanel'; 
    import tituloDaPagina from '$src/lib/tituloDaPagina.js';

    $tituloDaPagina = "Aprenda Mais ";

    import { page } from '$app/stores';
    import gotoIf from '$src/lib/gotoIf';

    let { usuario, erro } = $page.data;  

    gotoIf(usuario.id, "/"); // se estiver logado, volta proinicio

    let iptLogin = {
        name: "login",
        type: "text",
        placeholder: "Digite seu Login...",
        required: true,
    }
    let iptSenha = {
        name: "senha",
        type: "password",
        placeholder: "Digite sua Senha...",
        required: true,
    }
    let botaoEntrar = { 
        value: "Entrar",
    }
</script>

<div class="login">
    <BlockPanel.Panel>
        <form class="center" method="POST" action="/login/validar">
            <BlockPanel.Title> Login </BlockPanel.Title> 

            {#if erro == "sim"}
                <div class="erro">
                    Usuario ou Senha incorreta.
                </div>
            {/if}

            <div class="input">
                <BlockPanel.Input value="admin" title="Login" iptOptions={iptLogin} />
                <BlockPanel.Input value="senha" title="Senha" iptOptions={iptSenha} />
            </div>
            <BlockPanel.Button opcoesBotao={botaoEntrar} />
        </form>
    </BlockPanel.Panel>
</div> 

<div class="login">
    <BlockPanel.Panel>
        <BlockPanel.Title> Bem-vindo(a) ao nosso site</BlockPanel.Title> 

        <br>
        <br>

        Este site aprenda mais, é uma plataforma de sala virtual que possibilita os professores trabalharem com seus alunos algumas matérias online, estudos para o preparação do Enem, Vestibular e outras opções de estudo.
        Ao fazer o Login, o docente poderá criar sua sala, adicionar os alunos e postar suas atividades para os discentes responderem.
        <br>
        <br>

        <h2>Cinco vantagens dessa plataforma. </h2>
  
        <div class="jogos-avaliados">
                    <a href="">
                        <span>1º</span>
                        <img src="/fotos01/index aprendizado ensino básico.jpg">
                        <figcaption>Estudar a distância.</figcaption>
                    </a>
    
                    <a>
                        <span>2º</span>
                        <img  height="300" width="600" src="/fotos01/ensino-superior-brasil index.webp">
                       
                        <figcaption>Preparação de provas para ingressar em universidades.</figcaption>
                    </a>
    
                    <a>
                        <span>3º</span>
                        <img src="/fotos01/index faculdade particular.webp">
                        <figcaption>Concorrer a bolsas de estudos em faculdades particulares. </figcaption>
                    </a>
    
                    <a>
                        <span>4º</span>
                        <img src="/fotos01/index trabalhar.jpg">
                        <figcaption>Estudos para qualificação profisisonal.</figcaption>
                    </a>
    
                    <a>
                        <span>5º</span>
                        <img src="/fotos01/index viagens.jpg">
                        <figcaption>Manter aulas em momentos pandêmicos.</figcaption>
                    </a>
                </div>

    </BlockPanel.Panel>
    

</div>



<style>
    @media (max-width:600px){
        .input{
            background-color: #c00404;
        }
        footer{
            font-size: 7%;
        }
    }

    .login { 
        margin: 25px;
    }
    .erro {
        background: red;
        padding: 20px;
        color: white;
        font-weight: bolder;
        border-radius: 20px;
        margin-top: 20px;
    }
    .center {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input {
        margin: 20px 0;
        display: grid;
        grid-gap: 20px;
    }
    * {
	box-sizing: border-box;
}

header {
	background-color: #1612e7;
	color: #fff;
	padding: 20px;
}
.logo {
  width: 100px; /* largura do logotipo */
  height: 50px; /* altura do logotipo */
  position: absolute; /* posição absoluta para posicioná-lo onde você quiser */
  top: 10px; /* distância do topo */
  left: 10px; /* distância da esquerda */
}
iframe {
  align-items: center;
}
h1 .titulo.s{
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    
}
nav ul {
  list-style: none; /* remover marcadores de lista */
  margin: 0;
  padding: 0;
}
h2 {
  background-color: #c00404;
  color: #fbfbfb;
}
h3{
  background-color: #1b1441;
  text-align-last: center;
  color: #f1ecbbfc;
}
nav li {
  display: inline-block;
  margin: 0;
}
.botao {
  background-color: #3532ae; /* Cor de fundo */
  border: none; /* Remover a borda */
  color: white; /* Cor do texto */
  padding: 10px 25px; /* Espaçamento interno */
  text-align: center; /* Centralizar o texto */
  text-decoration: none; /* Remover o sublinhado */
  display: inline-block; /* Exibir como um bloco */
  font-size: 16px; /* Tamanho da fonte */
  margin: 4px 2px; /* Margem externa */
  cursor: pointer; /* Cursor ao passar o mouse */
  border-radius: 10px;
}
h4 {
  text-align: justify;
}

p {
  text-align: justify;
  size: 1px;
  text-align: center;
  
}
nav li a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #ffffff;
}

.container {
  display: flex;
  align-items: center;
}

img {
  width: 50%;
  margin-right: 20px;
}

.container {
  display: flex;
  align-items: center;
}

img {
  width: 50%;
  margin-right: 20px;
}


h1 {
	margin: 0;
}

nav ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
}

nav li {
	margin-right: 20px;

}

nav a {
	color: #fff;
	text-decoration: none;
}

main {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

.carousel {
	margin-bottom: 20px;
}

.carousel img {
	max-width: 100%;
	height: auto;
}

.about, .courses {
	margin-bottom: 20px
  }
  * {
    margin: 0;
    padding: 0;
}

.titulo-logo {
    margin: 0 10px;
}

.logo-destaque {
    font-weight: bold;
}

body {
    font-family: sans-serif;
}

main {
    width: 100%;
}

section {
    width: 100%;
    margin: 0 auto;
}

.limita-area {
    max-width: 1024px;
}
h3{
  box-decoration-break: clone;
}
img {
    width: 450px;
    height: 300px;
    align-self: center;
}

img:first-child {
    width: 100%;
    height: 50%;
}

h2 {
    width: 100%;
    text-align: center;
    padding: 25px 0;
    font-size: 25px;
    color: #1b1441;
    background-color: #fffdfd;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    
}

p {
    line-height: 32px;
    background-color: #6996f8ef;
    text-align: center;
}

p:last-child {
    display: inline;
    background: #fdf258;
    padding: 10px 5px;
    text-align: center;
    color: black;
    box-sizing: border-box;
}

.mais-informacoes {
    display: block;
    margin: 25px 0;
    font-weight: bold;
    padding-left: 10px;
    border-left: 2px solid #ed5a0e;
}

.jogos-avaliados {
    width: 100%;
    display: flex;
    margin: 25px 0px;
    overflow-x: scroll;
}

a {
    display: flex;
    flex-direction: column;
    margin: 5px 10px;
}

 a span {
    color: rgb(3, 16, 93);
    font-family:sans-serif;
    margin: 12px 0;
    padding: 12px 5px;
    text-align: center;
    background: rgb(255, 255, 255);
    flex-direction: column-reverse;
    font-feature-settings:"blwf";
    border-radius: 1cm
    
    
}
figcaption{
    color: #fbfbfb;
    background-color: rgb(8, 34, 140);
    font-family:cursive;

    border-bottom: #ffffff;
    margin: 10px 0;
    padding: 12px 5px;
    text-align: center;
    flex-direction: column-reverse;
    font-feature-settings:"blwf";
    border-radius: 1cm

}


</style>