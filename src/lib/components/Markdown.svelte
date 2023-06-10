<script lang="ts">
    import { markedSvelteExtensionInline } from '$lib/client/MarkedSvelteExtension';
    import { marked } from 'marked';
    import { onMount } from 'svelte';

    // export let unsafe = false;
    export let value = `
# Hello world!
This is a **test**<br>
It has cool things<br>
Like \`inline code\` and stuff<br>
It also has code blocks<br>

go to [this](#cool)

\`\`\`lmao
Test block
function() {
    cool.etc()
}
\`\`\`

## Why?
- It's *cool*
- It's ~easy~
- There are \`So many loafs\` around

as you can see, it's a bagel

### Cool!
1. Number
    1. Inner
    1. Inner
    1. Inner
1. Number
    - What
    - What
    - What
1. Number
1. Number

> cool boi

> Lorem ipsum
>> Dolor \`sit\` amet "cool" cob

### Tables??
Hello | world | cool | cool | cool with a lot of header text that could've been shortened but whatever | cool | cool | cool | cool | cool | cool
--|--|-- | -- | -- | -- | -- | -- | -- | -- | --
what | is | this | cool | cool | cool | cool | cool | cool | cool | cool
what | is | this | cool | cool | cool | cool | cool | cool | cool | cool
what | is | this | cool | cool | cool | cool | cool | cool | cool | cool

## How about components?
{!test}
{!test;hello=world;cool}
    `;

    const options = {
        mangle: false,
        headerIds: false,
        extensions: [markedSvelteExtensionInline],
    };

    marked.use(options);

    let output: string = marked.parse(value);

    onMount(() => {
        // output = marked.parse(value);
    });
</script>

<article class="con prose w-full">
    {@html output}
</article>
