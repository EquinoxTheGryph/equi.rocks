<script lang="ts">
	// import type { LayoutData } from './$types';
	import Footer from '$components/Footer.svelte';
	import Navbar from '$components/Navbar.svelte';
	import '../app.css';

	// export let data: LayoutData;

	let navLinks = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'Gallery',
			url: '/gallery'
		},
		{
			name: 'Stuff',
			url: '/extras'
		},
		{
			name: 'About',
			url: '/about'
		}
	];
</script>

<div class="flex min-h-screen flex-col">
	<Navbar {navLinks} />
	<slot />
	<div class="flex-grow" />
	<Footer {navLinks} />
</div>
