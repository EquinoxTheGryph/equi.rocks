<script lang="ts">
    export let navLinks: {
        url: string,
        name: string
    }[];
</script>

<nav class="w-full h-10 bg-slate-600 text-slate-200">
	<!-- Icon and title container -->
	<div class="" />

	<!-- Nav Items -->
	<ul class="flex items-center h-full">
		{#each navLinks as navItem}
			<li>
				<a href={navItem.url} class="p-2">{navItem.name}</a>
			</li>
		{/each}
	</ul>
</nav>