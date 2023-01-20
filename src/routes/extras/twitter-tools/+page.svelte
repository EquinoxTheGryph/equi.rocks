<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const botBaiters = ['hack', 'looking', 'art', 'bot', 'buy', 'commission', 'design'];

	const softLimit = 100;

	const zwsp = '\u200B';

	let text: string = '';
	let result: string = '';
	let useList = true;

	$: result = getResult(text);

	function getResult(input: string): string {
		return input;
	}

	function apply() {
		window.navigator.clipboard.writeText(result);
	}
</script>

<h1>Twitter anti-bot helper</h1>
<h3>Helps reducing the chances of bots being attracted by your posts!</h3>
<h6>This works by inserting zero-width spaces in between potentially bot-baiting words</h6>

<div class="container p-4">
	<textarea bind:value={text} class="w-full text-text bg-primary" />
    
    <p class="w-full text-right">

        {#if result.length > softLimit}
		<i>The resulting text length is too long for twitter! </i>
        {/if}
        
        <i>{softLimit - result.length}</i>
    </p>

    <div class="container">
        <input type="checkbox" bind:checked={useList} id="useList" />
        <label for="useList" class="pl-1">Only use a list of common words (Saves on resulting text length)</label>
    </div>
</div>


<button on:click={apply} class="btn">Apply result and copy to clipboard</button>
