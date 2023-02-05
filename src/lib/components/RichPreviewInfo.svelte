<script lang="ts">
	export let title: string;
	export let description: string | null = null;
	export let image: string = '/images/icon.png';
	export let imageAlt: string = 'Site Icon';
	export let renderTitle: boolean = false;
	export let url = "https://equi.rocks";
	export let name = "equi.rocks";

	const site = '@EquinoxTheGryph';
	const creator = site;

	// @see https://www.everywheremarketer.com/blog/ultimate-guide-to-social-meta-tags-open-graph-and-twitter-cards
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={name} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content={imageAlt} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
	<meta property="twitter:site" content={site} />
	<meta property="twitter:creator" content={creator} />
</svelte:head>

{#if renderTitle}
	<h1>{title}</h1>
	<h2>{description}</h2>
{/if}
