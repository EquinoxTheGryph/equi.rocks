<script lang="ts">
    import { page } from '$app/stores';

    export let data;

    // From `node_modules/@auth/core/lib/pages/signin.js`
    const signinErrors = {
        default: 'Unable to sign in.',
        signin: 'Try signing in with a different account.',
        oauthsignin: 'Try signing in with a different account.',
        oauthcallback: 'Try signing in with a different account.',
        oauthcreateaccount: 'Try signing in with a different account.',
        emailcreateaccount: 'Try signing in with a different account.',
        callback: 'Try signing in with a different account.',
        oauthaccountnotlinked:
            'To confirm your identity, sign in with the same account you used originally.',
        emailsignin: 'The e-mail could not be sent.',
        credentialssignin: 'Sign in failed. Check the details you provided are correct.',
        sessionrequired: 'Please sign in to access this page.'
    } as const;

    const error = $page.url.searchParams.get('error')?.toLowerCase() as
        | keyof typeof signinErrors
        | null;
</script>

<form method="POST" action="/auth/callback/credentials" class="flex w-80 flex-col gap-2">
    {#if error}
        <div>{signinErrors[error]}</div>
    {/if}
    <input name="csrfToken" type="hidden" value={data.csrfToken} />
    <label>
        Username
        <input name="username" type="text" required />
    </label>
    <label>
        Password
        <input name="password" type="password" required />
    </label>
    <label>
        Token
        <input name="token" type="password" minlength="6" maxlength="6" />
    </label>
    <button type="submit">Sign in</button>
</form>
