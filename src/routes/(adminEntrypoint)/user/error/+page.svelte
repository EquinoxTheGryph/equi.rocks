<script lang="ts">
    import { page } from '$app/stores';
    import { signinErrors } from '$lib/base/Util';

    const error = $page.url.searchParams.get('error')?.toLowerCase() as
        | keyof typeof signinErrors
        | null;
</script>

{#if error}
    {signinErrors[error]}
{/if}
