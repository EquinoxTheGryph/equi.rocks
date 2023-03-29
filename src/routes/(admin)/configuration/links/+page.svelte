<script lang="ts">
	import LinkButton from '$components/LinkButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.userLinks as item}
	<LinkButton
		linkItem={{
			name: item.title,
			sub: item.subTitle,
			icon: item.icon,
			url: `/configuration/links/${item.id}`
		}}
	/>
{/each}

<LinkButton
	linkItem={{
		name: 'Add new',
		url: `/configuration/links/new`
	}}
/>
