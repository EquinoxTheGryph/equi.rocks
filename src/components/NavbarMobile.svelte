<script lang="ts">
	import { page } from '$app/stores';
	import Icon from 'mdi-svelte';

	export let navLinks: {
		url: string;
		icon: string;
	}[];
</script>

<nav
	class="fixed bottom-0 z-nav flex h-navMobile w-full items-center bg-secondary-dark bg-opacity-70 text-text-dark drop-shadow-md backdrop-blur sm:hidden"
>
	{#each navLinks as navItem}
		<a
			href={navItem.url}
			class={'flex flex-grow justify-center hover:text-secondary ' +
				($page.url.pathname == navItem.url ? 'text-secondary' : '')}
		>
			<Icon path={navItem.icon} />
		</a>
	{/each}
</nav>

<div class="h-navMobile w-full sm:hidden" />
