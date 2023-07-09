<script>
    import Markdown from './Markdown.svelte';

    export let value = '';
    let preview = true;
</script>

<section class=" flex w-full max-w-[65ch] flex-col">
    <label class="mb-2">
        <input type="checkbox" bind:checked={preview} />
        Show Preview
    </label>
    {#if preview}
        <Markdown {value} />
    {:else}
        <textarea
            bind:value
            class="h-[30em] flex-grow"
            placeholder="Enter your markdown content here..."
        />
    {/if}
</section>
