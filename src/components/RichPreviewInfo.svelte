<script lang="ts">
    export let title: string;
    export let description: string|null = null;
    export let image: string|null = null;
	export let renderTitle: boolean = false
</script>

<svelte:head>
    <title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description}>
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image ?? "/images/icon.png"} />
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</svelte:head>

{#if renderTitle}
	<h1>{title}</h1>
	<h2>{description}</h2>
{/if}