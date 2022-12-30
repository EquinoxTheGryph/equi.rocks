<script lang="ts">
    // import type { LayoutData } from './$types';
    import "../app.css";
    
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
        },
    ]
</script>

<!-- Navbar -->
<nav class="w-100 bg-slate-500 text-white h-10">
    <!-- Icon and title container -->
    <div class="">

    </div>

    <!-- Nav Items -->
    <ul class="flex">
        {#each navLinks as navItem}
            <li>
                <a href={navItem.url} class="p-2">{navItem.name}</a>
            </li>
        {/each}
    </ul>
</nav>

<!-- Content slot -->
<slot />

<!-- Footer -->
<footer>
    <!-- Left content -->
    <!-- Seperation line -->
    <!-- Right content -->
</footer>