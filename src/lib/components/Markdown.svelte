<script lang="ts">
    import { markedSvelteExtensionInline } from '$lib/client/MarkedSvelteExtension';
    import { marked } from 'marked';
    import { SvelteComponent, onDestroy, onMount, tick } from 'svelte';
    import { componentsIndex, type ComponentItem } from './modules/ComponentIndex';
    import { nanoid } from 'nanoid';

    // export let unsafe = false;

    //#region
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
{!test;value=400}
{!test;value=500}
    `;
    //#endregion

    const options = {
        mangle: false,
        headerIds: false,
        extensions: [markedSvelteExtensionInline]
    };

    marked.use(options);

    let output: string;
    let articleElement: HTMLElement;

    const componentStore = new Map<string, SvelteComponent>();

    function render() {
        destroyComponents()
        output = marked.parse(value);
    }

    function insertComponents() {
        articleElement.querySelectorAll('.sv-component').forEach((element) => {
            // Extract Component from input
            const componentName = element.getAttribute('data-component');

            // Check if the input is a string
            if (typeof componentName != 'string') {
                console.error('Invalid component name:', componentName);
                return;
            }

            // Check if the input is an existing component
            const componentClass: typeof SvelteComponent | undefined = Object.entries(
                componentsIndex
            ).find(
                ([_name, _component]) => _name.toLowerCase() == componentName.toLowerCase()
            )?.[1];

            if (!componentClass) {
                console.error('No such component:', componentName);
                return;
            }

            // Create component if not done so yet
            let component: SvelteComponent;

            if (
                element.id &&
                componentStore.has(element.id) &&
                componentStore.get(element.id) instanceof componentClass
            ) {
                // Reuse the component if already instantiated (TODO: Does not work yet)
                component = componentStore.get(element.id)!;
            } else {
                // Init and Register Component
                let id = nanoid(8);
                element.id = id;

                component = new componentClass({
                    target: element
                });

                componentStore.set(id, component);
            }

            // Extract Props from input
            const props = element
                .getAttributeNames()
                .filter((attr) => attr.startsWith('data-prop-'))
                .reduce<Map<string, string | null>>(
                    (store, item) =>
                        store.set(item.replace(/data-prop-/i, ''), element.getAttribute(item)),
                    new Map()
                );

            // Check if the props exist and set it, warn otherwise
            const componentProps = component.$$.props;

            props.forEach((propValue, propName) => {
                if (!Object.hasOwn(componentProps, propName)) {
                    console.warn('Component has no prop named:', propName);
                } else {
                    // Set it if it does exist (Requires `accessors` to be enabled)
                    component[propName] = propValue;
                }
            });
        });
    }

    function destroyComponents() {
        componentStore.forEach(item => item.$destroy())
        componentStore.clear()
    }

    render();

    onMount(async () => {
        render();
        insertComponents();
    });

    onDestroy(() => {
        destroyComponents();
    })
</script>

<article class="prose w-full" bind:this={articleElement}>
    {@html output}
</article>
