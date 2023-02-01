<script lang="ts">
    import { page } from '$app/stores';
	import RichPreviewInfo from '$components/RichPreviewInfo.svelte';

    export const prerender = false;
</script>

<RichPreviewInfo title={`Page error ${$page.status}: ${$page.error?.message}`} />

<img src="/images/loaf.png" alt="Artwork of Equinox loafing with a grumpy face" class="drop-shadow-md cursor-grab px-2">
<section class="text-center p-2">
    <h1>{$page.status}</h1>
    <h2 class="opacity-70">{$page.error?.message}</h2>
    <em>Art by <a class="underline" href="https://twitter.com/Blajnart">Blajn</a></em>
</section>