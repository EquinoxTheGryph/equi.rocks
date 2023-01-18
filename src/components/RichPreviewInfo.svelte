<script lang="ts">
    export let title: string;
    export let description: string|null = null;
    export let image: string|null = null;
</script>

<svelte:head>
    <title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description}>
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</svelte:head>