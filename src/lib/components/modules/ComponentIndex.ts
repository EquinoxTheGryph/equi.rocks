// Define exposed components here
import type { SvelteComponent } from 'svelte';

import Hello from './Hello.svelte';
import Test from './Test.svelte';

export const componentsIndex: Record<string, typeof SvelteComponent> = {
    Test,
    Hello: Hello as typeof SvelteComponent
};
