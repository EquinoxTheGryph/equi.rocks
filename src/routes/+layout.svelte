<!-- Cursed piece of code that imports a style based on whether the page is public or not -->
<script lang="ts">
    import { page } from '$app/stores';
    import customStyle from '/src/app.css?inline';
    import carbonStyle from '/node_modules/carbon-components-svelte/css/g90.css?inline';

    const isPublic =
        $page.route.id?.includes('(public)') || $page.route.id?.includes('preview-markdown');
</script>

<svelte:head>
    {@html `<style>${isPublic ? customStyle : carbonStyle}</style>`}
</svelte:head>

<slot />
