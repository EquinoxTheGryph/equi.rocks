import type { PageServerLoad } from './$types';

export const prerender = 'auto';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;