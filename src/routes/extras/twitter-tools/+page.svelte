<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    const botBaiters = [
        "hack",
        "looking",
        "art",
        "bot",
        "buy",
        "commission",
        "design",
    ];

    const softLimit = 100;

    const zwsp = "\u200B";

    let text: string = "";
    let result: string = "";
    let useList = true;
    
    $: result = getResult(text);

    function getResult(input: string): string {
        return input;
    }

    function apply() {
        new Clipboard().writeText(result);
    }
</script>

<h1>Twitter anti-bot helper</h1>
<h2>Helps reducing the chances of bots being attracted by your posts!</h2>
<p>This works by inserting zero-width spaces in between potentially bot-baiting words</p>

<textarea bind:value={text} class="text-black"/>

<p>{softLimit - result.length}</p>

{#if result.length > softLimit}
    <p>The resulting text length is too long for twitter!</p>
{/if}

<input type="checkbox" bind:checked={useList} id="useList"/>
<label for="useList">Only use a list of common words (Saves on resulting text length)</label>

<button on:click={apply}>Apply result and copy to clipboard</button>
