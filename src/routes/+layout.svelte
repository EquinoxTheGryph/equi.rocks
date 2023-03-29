<script lang="ts">
	import { mdiHammerScrewdriver, mdiHome, mdiInformation, mdiViewGallery } from '@mdi/js';
	import { page } from '$app/stores';
	import '../app.css';
	import Icon from 'mdi-svelte';

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

<!-- Navbar (Desktop) -->
<nav
	class="fixed z-nav flex h-nav w-full bg-secondary-dark bg-opacity-70 text-text-dark drop-shadow-md backdrop-blur max-sm:hidden"
>
	<ul class="flex h-full items-center">
		<li>
			<a href="/" class="p-2 hover:text-secondary">Equi.rocks</a>
		</li>
		{#each navLinks as navItem}
			<li>
				<a
					href={navItem.url}
					class={'p-2 hover:text-secondary ' +
						($page.url.pathname == navItem.url ? 'text-secondary' : '')}
				>
					{navItem.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<div class="invisible h-nav w-full max-sm:hidden" />

<!-- Content -->
<slot />

<div class="flex-grow" />

<!-- Footer -->
<footer class="flex h-footer w-full items-center justify-center bg-secondary-dark p-5">
	<div class="p-2 text-right">
		<p><a href="/" class=" hover:text-secondary">equi.rocks</a></p>
		<p class="text-xs italic opacity-70">
			A web page by Equinox the gryph, ©{new Date().getFullYear()}
		</p>
	</div>
	<ul class="right border-l-[1px] border-l-secondary">
		{#each navLinks as navItem}
			<li>
				<a href={navItem.url} class="p-2 hover:text-secondary">{navItem.name}</a>
			</li>
		{/each}
	</ul>
</footer>

<!-- Navbar (Mobile) -->
<nav
	class="fixed bottom-0 z-nav flex h-navMobile w-full items-center bg-secondary-dark bg-opacity-70 text-text-dark drop-shadow-md backdrop-blur sm:hidden"
>
	{#each navLinks as navItem}
		<a
			href={navItem.url}
			class={'flex flex-grow justify-center hover:text-secondary ' +
				($page.url.pathname == navItem.url ? 'text-secondary' : '')}
		>
			<Icon path={navItem.icon} />
		</a>
	{/each}
</nav>

<div class="h-navMobile w-full sm:hidden" />
