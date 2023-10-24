<script>
    export let opcoesBotao;    
    export let onClick = () => {}
</script>

<input type="submit" on:click={onClick} {...opcoesBotao}>

<style>
    input {
        background: hsl(216, 94%, 65%);
        text-transform: uppercase;
        font-weight: bolder; 
        font-size: 20px;
        padding: 15px; 
        padding-right: 30px; 
        padding-left: 30px; 
        border: none;
        border-radius: 20px;
        cursor: pointer;
    }
    input:hover {
        background: hsl(216, 100%, 76%);
    }
    input:active {
        background: hsl(216, 51%, 44%);
    }
</style>