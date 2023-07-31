<script lang="ts">
	import { page } from '$app/stores';
	import RichPreviewInfo from '$components/RichPreviewInfo.svelte';

	export const prerender = false;
</script>

<RichPreviewInfo title={`Page error ${$page.status}: ${$page.error?.message}`} />

<svelte:head>
    <!-- Include Custom Styles -->
    <link rel="stylesheet" href="/src/app.css" />
</svelte:head>

<main class="flex flex-col items-center p-10">
	<img
		src="/images/loaf.png"
		alt="Artwork of Equinox loafing with a grumpy face"
		class="cursor-grab px-2 drop-shadow-md"
	/>
	<section class="p-2 text-center">
		<h1>{$page.status}</h1>
		<h2 class="opacity-70">{$page.error?.message}</h2>
		<em>
			Art by <a class="underline" href="https://twitter.com/Blajnart">Blajn</a>
		</em>
	</section>
	<button on:click={() => window.history.back()}>Go Back</button>
</main>
