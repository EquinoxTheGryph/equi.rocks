<script lang="ts">
    import { page } from '$app/stores';

    export const prerender = false;
</script>

<svelte:head>
  <title>Page error {$page.status}: {$page.error?.message}</title>
</svelte:head>

<article class="flex flex-col mx-auto max-w-md p-10 items-center">
    <img src="/images/loaf.png" alt="Artwork of Equinox loafing with a grumpy face" class="drop-shadow-md cursor-grab">
    
    <section class="text-center p-2">
        <h1 class="text-6xl">{$page.status}</h1>
        <h2 class="opacity-70">{$page.error?.message}</h2>
        <i class="text-sm font-medium opacity-40">Art by <a class="underline" href="https://twitter.com/Blajnart">Blajn</a></i>
    </section>
</article>