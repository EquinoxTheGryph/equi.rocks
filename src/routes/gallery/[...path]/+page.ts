import type { PageLoad } from './$types';

export const load = (async (clientData) => {
    return {
        serverData: clientData.data
    };
}) satisfies PageLoad;