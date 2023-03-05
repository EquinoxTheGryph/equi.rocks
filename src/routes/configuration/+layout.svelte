<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>

<!-- Sidebar -->
<nav class="">
    <a href="/configuration/">Basic</a>
    <a href="/configuration/icons">Icons</a>
    <a href="/configuration/links">Links</a>
</nav>

<slot />