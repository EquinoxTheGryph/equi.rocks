// Define exposed components here
import type { ComponentProps, SvelteComponent } from 'svelte';

import Test from './Test.svelte';
import Hello from './Hello.svelte';

export type ComponentItem<T extends typeof SvelteComponent = typeof SvelteComponent> = {
    component: T;
    props?: ComponentProps<InstanceType<T>>;
};

// export const componentStore = new Map<string, ComponentItem>();

export const componentsIndex: Record<string, typeof SvelteComponent> = {
    Test,
    Hello: Hello as typeof SvelteComponent
}
