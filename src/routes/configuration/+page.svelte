<script lang="ts">
	import Form from '$components/forms/Form.svelte';
	import FormInput from '$components/forms/FormInput.svelte';
    import type { PageData, ActionData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;

    let value = {}
</script>

<!-- { form?.success } -->
<!-- 

<form method="POST">
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <button formaction="?/test">Test</button>
</form> -->
<!-- 
<Form bind:value>
    <FormInput name="hello">
        Input text
    </FormInput>
</Form>

{JSON.stringify(value)} -->
