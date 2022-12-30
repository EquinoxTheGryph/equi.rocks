import type { PageServerLoad } from './$types';

export const load = (async (serverData) => {
    const href = serverData.url.href;
    return {
        url: href
    };
}) satisfies PageServerLoad;