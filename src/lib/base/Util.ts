export type Maybe<T> = T | undefined | null;

export function setTimeoutPromise(timeout: number): Promise<void> {
    return new Promise((res) => setTimeout(res, timeout));
}

// From `node_modules/@auth/core/lib/pages/signin.js`
export const signinErrors = {
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
