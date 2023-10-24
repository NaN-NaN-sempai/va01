<script>
    import tituloDaPagina from '$src/lib/tituloDaPagina.js';
    $tituloDaPagina = "erro";

	import { page } from '$app/stores';
</script>

<br>
<br>

<h1 style="text-align: center">ocorreu um erro</h1>

<br>
<br>
<br>

<h2 style="text-align: center">{$page.status}: {$page.error?.message}</h2> 
