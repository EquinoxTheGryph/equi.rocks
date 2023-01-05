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
    href={linkItem.url}
    class="
        m-2
        flex
        w-80 
        rounded-full 
        bg-red-800 
        p-2 
        text-zinc-100  
        drop-shadow-lg
        transition-transform 
        hover:scale-[1.025]
        hover:drop-shadow-sm 
        active:translate-y-[2px]
    "
>
    {#if linkItem.icon}
        <span class="px-1.5 flex items-center">
            <Icon path={linkItem.icon} />
        </span>
    {/if}
    
    <section class="flex-grow text-center">
        <p>
            {linkItem.name}
        </p>
        <p class="text-sm opacity-75 font-medium">{linkItem.sub}</p>
    </section>

    {#if linkItem.icon}
        <span class="w-[24px] px-2" />
    {/if}
</a>