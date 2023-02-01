<script lang="ts">
	export let navLinks: {
		url: string;
		name: string;
	}[];
</script>

<footer class="flex w-full items-center justify-center bg-secondary-dark p-5">
	<div class="p-2 text-right">
		<p><a href="/" class=" hover:text-secondary">equi.rocks</a></p>
		<p class="text-xs italic opacity-70">A web page by Equinox the gryph, ©{new Date().getFullYear()}</p>
	</div>
	<ul class="right border-l-[1px] border-l-secondary">
		{#each navLinks as navItem}
			<li>
				<a href={navItem.url} class="p-2 hover:text-secondary">{navItem.name}</a>
			</li>
		{/each}
	</ul>
</footer>
