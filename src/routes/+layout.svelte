<script lang="ts">
	// import type { LayoutData } from './$types';
	import Footer from '$components/Footer.svelte';
	import Navbar from '$components/Navbar.svelte';
	import NavbarMobile from '$components/NavbarMobile.svelte';
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

<Navbar {navLinks} />

<main class="flex flex-col items-center p-10">
	<slot />
</main>

<div class="flex-grow" />
<Footer {navLinks} />
<NavbarMobile {navLinks} />
