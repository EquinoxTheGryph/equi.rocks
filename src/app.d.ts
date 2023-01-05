// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

/**
 * Add module definitions for `mdi-svelte`
 * @see https://github.com/AlexxNB/mdi-svelte/issues/3#issuecomment-950026198
 */
declare module 'mdi-svelte' {
	import { SvelteComponentTyped } from 'svelte';

	export interface IconProps {
		path: string;
		size?: number | string;
		color?: string;
		flip?: boolean | string;
		rotate?: number;
		spin?: number | boolean;
		title?: string;
	}

	export default class Icon extends SvelteComponentTyped<IconProps> {}
}
