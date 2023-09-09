<script lang="ts">
    import { page } from '$app/stores';
    import Markdown from '$components/Markdown.svelte';
    import { onMount } from 'svelte';

    let value = '';

    onMount(() => {
        window.addEventListener(
            'message',
            function (event) {
                console.log("SET");
                
                let origin = event.origin;
                if (origin !== $page.url.origin) return;
                if (typeof event.data == 'object' && event.data.call == 'loadValue') {
                    value = event.data.value;
                }
            },
            false
        );
    });
</script>

<div class="p-4 h-screen w-screen">
    {#if value}
        {#key value}
            <Markdown {value} />
        {/key}
    {/if}
</div>
