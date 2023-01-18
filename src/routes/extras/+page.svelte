<script lang="ts">
	import LinkButton from '$components/LinkButton.svelte';
	import { mdiTwitter } from '@mdi/js';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="pb-3 text-4xl">Fun, Useful and Silly stuff!</h1>
<LinkButton
	linkItem={{
		name: 'Twitter anti-bot tools',
		url: '/extras/twitter-tools',
		sub: 'Helps reduce bots in your comments',
		icon: mdiTwitter
	}}
/>
<p class="font-light italic opacity-50">...More soon!</p>
