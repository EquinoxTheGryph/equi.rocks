<script lang="ts">
	import { page } from '$app/stores';

	export let navLinks: {
		url: string;
		name: string;
	}[];
</script>

<nav
	class="fixed z-nav flex h-nav  w-full bg-secondary-dark bg-opacity-70 text-text-dark drop-shadow-md backdrop-blur max-sm:hidden"
>
	<ul class="flex h-full items-center">
		<li>
			<a href="/" class="p-2 hover:text-secondary">Equi.rocks</a>
		</li>
		{#each navLinks as navItem}
			<li>
				<a
					href={navItem.url}
					class={'p-2 hover:text-secondary ' +
						($page.url.pathname == navItem.url ? 'text-secondary' : '')}
				>
					{navItem.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<div class="invisible h-nav w-full max-sm:hidden" />
