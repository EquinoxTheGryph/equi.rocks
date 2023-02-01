<script lang="ts">
	import LinkButton from '$components/LinkButton.svelte';
	import { mdiTwitter, mdiWrench } from '@mdi/js';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Fun, Useful and Silly stuff!</h1>
<LinkButton
	linkItem={{
		name: 'Twitter anti-bot tools',
		url: '/extras/twitter-tools',
		sub: 'Helps reduce bots in your comments',
		icon: mdiTwitter
	}}
/>
<!-- <LinkButton
	linkItem={{
		name: 'Test page',
		url: '/extras/test',
		sub: 'Random test stuff',
		icon: mdiWrench
	}}
/> -->
<em>...More soon!</em>
