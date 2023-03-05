<script lang="ts">
	import Icon from 'mdi-svelte';

	export let linkItem: {
		name: string;
		sub?: string;
		url?: string;
		icon?: string;
	};
</script>

<a
	on:click
	href={linkItem.url}
	class="
        m-2
        flex
        w-80 
        rounded-full 
        bg-secondary-dark
        p-2 
        text-text-dark
        drop-shadow-lg
        transition-transform 
        hover:scale-[1.025]
        hover:drop-shadow-sm 
        active:translate-y-[2px]
    "
>
	{#if linkItem.icon}
		<span class="flex items-center px-1.5">
			<Icon path={linkItem.icon} />
		</span>
	{/if}

	<section class="flex-grow text-center">
		<p>
			{linkItem.name}
		</p>
		<p class="text-sm font-medium opacity-75">{linkItem.sub}</p>
	</section>

	{#if linkItem.icon}
		<span class="w-[24px] px-2" />
	{/if}
</a>
