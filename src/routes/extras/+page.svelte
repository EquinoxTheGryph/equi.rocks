<script lang="ts">
    import LinkButton from '$components/LinkButton.svelte';
    import { mdiTwitter, mdiWrench } from '@mdi/js';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<h1 class="c-text">Fun, Useful and Silly stuff!</h1>
<LinkButton
    linkItem={{
        title: 'Twitter anti-bot tools',
        url: '/extras/twitter-tools',
        content: 'Helps reduce bots in your comments',
        icon: mdiTwitter
    }}
/>
<em class="c-text">...More soon!</em>
