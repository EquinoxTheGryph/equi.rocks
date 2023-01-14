<script lang="ts">
	export let navLinks: {
		url: string;
		name: string;
	}[];
</script>

<nav class="fixed z-nav flex h-nav w-full bg-secondary-dark text-text-dark drop-shadow-md">
	<ul class="flex h-full items-center">
		<li>
			<a href="/" class="p-2 hover:text-secondary">Equi.rocks</a>
		</li>
		{#each navLinks as navItem}
			<li>
				<a href={navItem.url} class="p-2 hover:text-secondary">{navItem.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<div class="h-nav w-full" />
