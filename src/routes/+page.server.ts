import type { PageServerLoad } from './$types';

// Prerender the content for now
// NOTE: Comment this when actually doing more stuff!
export const prerender = true;
export const csr = false;

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;