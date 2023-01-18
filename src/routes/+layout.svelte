<script lang="ts">
	// import type { LayoutData } from './$types';
	import Footer from '$components/Footer.svelte';
	import Navbar from '$components/Navbar.svelte';
	import NavbarMobile from '$components/NavbarMobile.svelte';
	import RichPreviewInfo from '$components/RichPreviewInfo.svelte';
	import { mdiHammerScrewdriver, mdiHome, mdiInformation, mdiViewGallery } from '@mdi/js';
	import '../app.css';

	// export let data: LayoutData;

	let navLinks = [
		{
			name: 'Home',
			url: '/',
			icon: mdiHome
		},
		{
			name: 'Gallery',
			url: '/gallery',
			icon: mdiViewGallery
		},
		{
			name: 'Stuff',
			url: '/extras',
			icon: mdiHammerScrewdriver
		},
		{
			name: 'About',
			url: '/about',
			icon: mdiInformation
		}
	];
</script>

<RichPreviewInfo
	title="Equinox's Frontpage"
	description="Links to some of my other accounts can be found here"
	image="/images/icon.png"
/>

<Navbar {navLinks} />

<main class="flex flex-col items-center p-10">
	<slot />
</main>

<div class="flex-grow" />
<Footer {navLinks} />
<NavbarMobile {navLinks} />
