<script lang="ts">
    import type { PageData, ActionData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;
</script>

{ form?.success }

<form method="POST">
    <button formaction="?/test">Test</button>
</form>