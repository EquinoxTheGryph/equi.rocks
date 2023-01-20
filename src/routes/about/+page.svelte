<script lang="ts">
	import LinkButton from '$components/LinkButton.svelte';
	import {
		mdiCashMultiple,
		mdiCast, mdiComment,
		mdiFormatListChecks, mdiImageFrame,
		mdiInformation,
		mdiMastodon, mdiTwitter
	} from '@mdi/js';

	let linkItems: {
		name: string;
		sub?: string;
		url?: string;
		icon?: string;
	}[] = [
		{
			name: 'Main Links'
		},
		{
			name: 'Support me',
			sub: 'Ko-Fi',
			url: 'https://ko-fi.com/equinoxthegryphon',
			icon: mdiCashMultiple
		},
		{
			name: 'Social Media',
			sub: 'Twitter',
			url: 'https://twitter.com/EquinoxTheGryph',
			icon: mdiTwitter
		},
		{
			name: 'Social Media',
			sub: 'Mastodon',
			url: 'https://squawk.social/@Equinox',
			icon: mdiMastodon
		},
		{
			name: 'Main gallery',
			sub: 'FurAffinity',
			url: 'https://www.furaffinity.net/user/aphelion1/',
			icon: mdiImageFrame
		},
		{
			name: 'Announcements',
			sub: 'Telegram Channel',
			url: 'https://t.me/ArtinoxStudios',
			icon: mdiComment
		},
		{
			name: 'Art Related Links'
		},
		{
			name: 'Art Streams',
			sub: 'Picarto',
			url: 'https://www.picarto.tv/EquinoxTheGryph/profile',
			icon: mdiCast
		},
		{
			name: 'Commission Information',
			sub: 'Price sheet and Terms of Service',
			url: 'https://github.com/STcraft/EquinoxCommissions/blob/master/README.md',
			icon: mdiInformation
		},
		{
			name: 'ToDo List',
			sub: 'Trello',
			url: 'https://trello.com/b/uofqljjE/equinox-commissions',
			icon: mdiFormatListChecks
		}
	];

	export const csr = false;
</script>

<article class="flex flex-col items-center p-2 text-center">
	<img
		src="/images/icon.png"
		alt="A headshot drawing of Equinox The Gryphon"
		class="mb-4 w-60 h-60 rounded-full drop-shadow-lg bg-own-600"
	/>
	<h1>Equinox The Gryphon</h1>
	<p class="opacity-80">Programmer and sometimes an artist</p>
	<p class="opacity-80">23, He/Him, Dutch</p>
	<p class="opacity-50 pt-2 text-sm italic">This site is still work in progress.<br/>Keep an eye on one of my social media sites for updates!</p>
</article>

<ul class="flex flex-col items-center">
	{#each linkItems as linkItem}
		<li>
			{#if linkItem.url}
				<LinkButton {linkItem} />
			{:else}
				<h2 class="py-1 pt-3 text-xl">{linkItem.name}</h2>
			{/if}
		</li>
	{/each}
</ul>

<!-- Mastodon link verification -->
<!-- svelte-ignore a11y-missing-content -->
<a rel="me" href="https://squawk.social/@Equinox" class="invisible" />
