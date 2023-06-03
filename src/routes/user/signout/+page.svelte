<script lang="ts">
    export let data;
</script>

<form method="POST" action="/auth/callback/signout" class="flex w-80 flex-col gap-2">
    <input name="csrfToken" type="hidden" value={data.csrfToken} />
    <button type="submit">Sign out</button>
</form>