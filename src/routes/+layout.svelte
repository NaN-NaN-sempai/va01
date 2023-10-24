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