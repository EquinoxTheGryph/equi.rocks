export const load = (async (event) => {
    return {
        // Use the csrfToken given by AuthJS
        csrfToken: (await (await event.fetch('/auth/csrf')).json()).csrfToken
    };
});