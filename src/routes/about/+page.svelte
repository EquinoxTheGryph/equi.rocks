<script lang="ts">
    import RichPreviewInfo from '$components/RichPreviewInfo.svelte';
    import UserLinkView from '$components/UserLinkView.svelte';

    export let data;
</script>

<RichPreviewInfo
    title="Equinox's About Page"
    description="Links to some of my other accounts can be found here"
/>

<article class="flex flex-col items-center p-2 text-center">
    <img
        src="/images/icon.png"
        alt="A headshot drawing of Equinox The Gryphon"
        class="mb-4 h-60 w-60 rounded-full bg-own-600 drop-shadow-lg"
    />
    <h1 class="c-text">Equinox The Gryphon</h1>
    <p class="opacity-80">Programmer and sometimes an artist</p>
    <p class="opacity-80">23, He/Him, Dutch</p>
    <p class="c-text pt-2 text-sm italic opacity-50">
        This site is still work in progress.
        <br />
        Keep an eye on one of my social media sites for updates!
    </p>
</article>

{#each data.userLinks as userLink}
    <UserLinkView {userLink} />
{/each}

<!-- Mastodon link verification -->
<!-- svelte-ignore a11y-missing-content -->
<a rel="me" href="https://squawk.social/@Equinox" class="invisible" />
