<script>

    export let title = "Input";

    export let iptOptions = {};

    export let value = "";

</script>

<div class="wrapper">
    <span> {title} </span>
    <input {...iptOptions} bind:value={value} >
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: stretch;
        width: 300px;
    }

    input {
        border: none;
        background: #D9D9D9;
        padding: 10px;
    }

    span {
        text-align: left;
        text-transform: capitalize;
        margin-left: 10px;
        padding-bottom: 5px;
    }
</style>