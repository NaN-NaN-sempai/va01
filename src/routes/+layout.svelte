<script>
    import NavBar from "$components/NavBar/index.js"; 

    import tituloDaPagina from "$src/lib/tituloDaPagina.js";

    export let data;

    let { usuario } = data; 
</script>

<head>
    <title>{$tituloDaPagina.toUpperCase()}</title>
</head>

<NavBar.Container titulo={$tituloDaPagina}
    logado={!!usuario.id}
    usuario={!!usuario.id? usuario.nome_exib: "Não Logado"}
    foto={!!usuario.id? usuario.imagem_exib: "https://static.thenounproject.com/png/1995026-200.png"} />

<slot></slot>

<footer>
    Campus IF BAIANO de Senhor do Bonfim-BA -™ 
</footer>
<footer>
    <p> Valdiney Silva - Ánalise e Projetos de Sistema de Informação</p>
  </footer>

<style>
    footer {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #9ba529;
    color: #050505;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}
</style>
