<script lang="ts">
	import Icon from 'mdi-svelte';
	import { mdiCardsSpade } from '@mdi/js';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let hovered = false;
	let iconSize = '2em';
</script>

<div
	class="bg-black"
	style:width={iconSize}
	style:height={iconSize}
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
/>

<div class="flex w-fit items-center">
	<!-- content here -->
	{#if hovered}
		<div transition:fly={{ duration: 500, x: 100 }}>
			<p>Hello world!</p>
		</div>
	{/if}

	<div>
		<Icon path={mdiCardsSpade} color="black" title="hello" size={iconSize} />
	</div>
</div>

<style>
	/* your styles go here */
</style>
