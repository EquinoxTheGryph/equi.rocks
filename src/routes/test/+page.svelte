<script>
import Markdown from "$components/Markdown.svelte";

const value = `
# Hello world!
This is a **test**<br>
It has cool things<br>
Like \`inline code\` and stuff<br>
It also has code blocks<br>

go to [this](#cool)

\`\`\`lmao
Test block
function() {
    () => {} == != += ?=
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
what | is | this | {!hello} | cool | cool | cool | cool | cool | cool | cool
what | is | this | cool | cool | cool | cool | cool | cool | cool | cool
what | is | this | cool | cool | cool | cool | cool | cool | cool | cool

## How about {!hello} components?
this is a {!test;value=400} component
{!test;value=500}
`

</script>

<Markdown {value}/>