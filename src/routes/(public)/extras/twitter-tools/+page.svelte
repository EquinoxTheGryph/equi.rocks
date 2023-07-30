<script lang="ts">
    import RichPreviewInfo from '$components/RichPreviewInfo.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const botBaiters = [
        'hack',
        'looking',
        'art',
        'bot',
        'buy',
        'commission',
        'comm',
        'design',
        'ko-fi',
        'kofi',
        'check',
        'patreon',
        'help',
        'site',
        'post',
        'etsy'
    ];

    const softLimit = 280;

    const zwsp = '\u200B';

    let text: string = '';
    let result: string = '';
    let useList = false; // TODO: Implement useList, make sure the original case is preserved!
    let factor = 0.25;

    // let processedBotBaiterList = botBaiters.map((element) => {
    // 	let elementOut = '';
    // 	for (let index = 0; index < element.length; index += 2) {
    // 		elementOut += element[index] + zwsp + (element[index + 1] ?? '');
    // 	}
    // 	return elementOut;
    // });

    $: result = getResult(text, factor, useList);

    function getResult(input: string, factor: number, useList: boolean): string {
        let out = '';

        // if (useList) {
        // 	out = input;

        // 	if (out.pos)

        // } else {
        for (let index = 0; index < input.length; index++) {
            const element = input[index];

            out += element;
            if (Math.random() > 1 - factor) out += zwsp;
        }
        // }

        return out;
    }

    function apply() {
        window.navigator.clipboard.writeText(result);
    }
</script>

<RichPreviewInfo
    title="Twitter anti-bot helper"
    description="Helps reducing the chances of bots being attracted by your posts!"
    renderTitle={true}
/>

<em class="c-text">
    This works by inserting zero-width spaces (or zwsp) in between potentially bot-baiting words
</em>

<div class="container p-4">
    <textarea bind:value={text} class="w-full bg-primary p-1 text-text" />

    <p class="w-full text-right">
        <i>
            {#if result.length > softLimit}
                The resulting text length is too long for twitter!
            {:else}
                Characters Remaining (after processing):
            {/if}
            {softLimit - result.length}
        </i>
    </p>

    <!-- <div class="container py-2">
		<input type="checkbox" bind:checked={useList} id="useList" />
		<label for="useList" class="pl-1">
			Only use a list of common words (Saves on resulting text length)
		</label>
	</div> -->

    {#if !useList}
        <div class="container py-2">
            <input
                type="range"
                class="max-sm:container"
                id="factor"
                bind:value={factor}
                min={0.1}
                max={0.95}
                step={0.05}
            />
            <label for="factor" class="pl-1">
                {(factor * 100).toFixed(0)}% - The amount of
                <abbr title="Zero width space">zwsp</abbr>
                inserted.
            </label>
        </div>
    {/if}

    <article class="p-2">
        <h4 class="c-text">Preview</h4>
        <section class="container overflow-hidden">
            {#if result?.length}
                {@html result.replaceAll(zwsp, '<span class="zwsp">|</span>')}
            {:else}
                <h6 class="c-text">
                    Start typing in the box above to see your result! Invisible characters will be
                    shown as a line
                </h6>
            {/if}
        </section>
    </article>
</div>

<button on:click={apply} class="btn">Apply result and copy to clipboard</button>

<!-- <button
	on:click={() =>
		alert(
			'The current list of filtered words:\n' +
				botBaiters.join(', ') +
				'.\n\nFeel free to suggest more!'
		)}
	class="m-3 font-light italic underline opacity-70"
>
	See the current list of filtered words
</button> -->

<em class="c-text">This page does not collect any user data and only runs locally.</em>

<style lang="postcss">
    :global(.zwsp) {
        @apply text-red-500;
        @apply opacity-70;
    }

    /* .disabled {
		@apply opacity-70;
		@apply cursor-default;
		@apply pointer-events-none;
		@apply grayscale;
	} */
</style>
