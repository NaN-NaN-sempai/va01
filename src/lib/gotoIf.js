import { goto } from '$app/navigation';
import { onMount } from 'svelte';

export default (bool, path) => {
    onMount(() => {
        if(bool) goto(path);
    })
}