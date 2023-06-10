<script lang="ts">
    import { nanoid } from 'nanoid';
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';

    export let value = 0;
    let timer = Date();
    let id = nanoid();

    const dispatch = createEventDispatcher();

    onMount(() => {
        console.log("onMount", id);
        setInterval(() => {
            timer = Date();
        }, 1000);
    });

    onDestroy(() => {
        console.log("onDestroy", id);
    })
</script>

<div class="w-60 h-60 border border-own-200 p-2">
    <h2>Hello world!</h2>
    <p>Value = {value}</p>
    <p>Current time = {timer}</p>
    <button
        on:click={() => {
            value++;
            dispatch('update', value);
        }}
    >
        Click me!
    </button>
</div>
