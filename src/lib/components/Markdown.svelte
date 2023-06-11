<script lang="ts">
    import { markedSvelteExtensionInline } from '$lib/client/MarkedSvelteExtension';
    import { marked } from 'marked';
    import { SvelteComponent, onDestroy, onMount } from 'svelte';
    import { componentsIndex } from './modules/ComponentIndex';
    import { nanoid } from 'nanoid';
    import DOMPurify from 'isomorphic-dompurify';

    export let value: string;
    export let css = '';
    export let unsafe = false;

    const componentStore = new Map<string, SvelteComponent>();
    const config: marked.MarkedExtension = {
        mangle: false,
        headerIds: false,
        extensions: [markedSvelteExtensionInline],
        hooks: {
            postprocess: (html) => (unsafe ? html : DOMPurify.sanitize(html))
        }
    };

    let articleElement: HTMLElement;
    let output: string;

    function render() {
        destroyComponents();
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
        componentStore.forEach((item) => item.$destroy());
        componentStore.clear();
    }

    marked.use(config);
    render();

    onMount(async () => {
        render();
        insertComponents();
    });

    onDestroy(() => {
        destroyComponents();
    });
</script>

<article class="prose w-full overflow-hidden {css}" bind:this={articleElement}>
    {@html output}
</article>
