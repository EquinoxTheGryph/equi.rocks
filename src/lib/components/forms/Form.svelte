<!-- Base Form Component, Place various form elements inide it -->
<script lang="ts">
	import FormContext from '$lib/base/FormContext';
    import { setContext } from 'svelte';
    import { writable, type Writable } from 'svelte/store';

	export let value: {};

	const formContextInit = new FormContext();

	const localStore: Writable<FormContext> = setContext('formContext', writable(formContextInit));
</script>

<form class="flex flex-col">
	<slot />
</form>

{JSON.stringify($localStore)}
