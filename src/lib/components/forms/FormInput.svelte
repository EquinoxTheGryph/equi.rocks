<script lang="ts">
	import type FormContext from '$lib/base/FormContext';
    import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

    const localStore: Writable<FormContext> = getContext('formContext');

    // export let value: {};
    export let name: string;

    localStore.update(_localStore => _localStore.register({id: 'wfaf', name:'fawf'}))
</script>

<label for={name}><slot /></label>
<input type="text" {name}/>