<script lang="ts">
    import { page } from '$app/stores';
    import Markdown from '$components/Markdown.svelte';
    import { Tab, TabContent, Tabs, TextArea } from 'carbon-components-svelte';
    import { onMount, tick } from 'svelte';

    let selected: number | undefined;

    export let value: string | undefined | null = '';

    let frame: HTMLIFrameElement;

    let renderIFrame = false;

    $: if (selected == 1) {
        renderMarkdown(value ?? '');
    }

    /**
     * Post a new value to the IFrame renderer
     * @param value
     */
    async function renderMarkdown(value: string) {
        if (!frame) {
            await tick();
            // @ts-ignore Let the loading settle for a bit
            frame?.addEventListener('load', () =>
                frame?.contentWindow?.postMessage({ call: 'loadValue', value }, '/')
            );
        } else {
            frame?.contentWindow?.postMessage({ call: 'loadValue', value }, '/');
        }
    }

    onMount(() => renderIFrame = true)
</script>

<Tabs bind:selected>
    <Tab label="Edit" />
    <Tab label="Preview" />
    <svelte:fragment slot="content">
        <TabContent style="padding: 0;">
            {#if selected == 0}
                <TextArea
                    name="description"
                    placeholder="A description about the given media"
                    rows={25}
                    bind:value
                />
            {/if}
        </TabContent>
        <TabContent style="padding: 0;">
            {#if renderIFrame}
                <iframe src="/preview-markdown" title="Markdown preview" bind:this={frame} />
            {/if}
        </TabContent>
    </svelte:fragment>
</Tabs>

<style lang="scss">
    iframe {
        width: 100%;
        height: 50em;
    }
</style>
