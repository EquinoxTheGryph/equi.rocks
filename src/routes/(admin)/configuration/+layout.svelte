<script lang="ts">
    import {
        mdiArrowLeft,
        mdiHammerScrewdriver,
        mdiHome,
    } from '@mdi/js';
    import { page } from '$app/stores';
    import Icon from 'mdi-svelte';

    let navLinks: { name: string; action: string; icon: string }[] = [
        {
            name: 'Logout',
            action: '/auth/signout',
            icon: mdiArrowLeft
        },
        {
            name: 'Home',
            action: '/configuration',
            icon: mdiHome
        },
        {
            name: 'Links',
            action: '/configuration/links',
            icon: mdiHammerScrewdriver
        }
    ];
</script>

<!-- <section class="flex h-full w-full justify-stretch"> -->
    <!-- Sidebar -->
    <!-- <nav class="flex h-full w-40 flex-col">
        {#each navLinks as navItem}
            <a
                href={navItem.action}
                class={'flex w-full gap-4 p-3 hover:text-secondary ' +
                    ($page.url.pathname == navItem.action ? 'text-secondary' : '')}
            >
                <Icon path={navItem.icon} />
                {navItem.name}
            </a>
        {/each}
    </nav> -->

    <!-- <main class="flex w-full grow flex-col items-center p-10"> -->
        <slot />
    <!-- </main> -->
<!-- </section> -->
