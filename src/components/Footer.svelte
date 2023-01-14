<script lang="ts">
    export let navLinks: {
        url: string,
        name: string
    }[];
</script>

<footer class="bg-secondary-dark flex p-5 w-full items-center justify-center">
    <div class="left">
        <a href="/" class="p-2 hover:text-secondary">equi.rocks</a>
    </div>
    <ul class="right border-l-secondary border-l-[1px]">
		{#each navLinks as navItem}
			<li>
				<a href={navItem.url} class="p-2 hover:text-secondary">{navItem.name}</a>
			</li>
		{/each}
    </ul>
</footer>