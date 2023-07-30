import { db } from '$lib/server/Db';

export const load = (async () => {
    return {
        userLinks: (await db.userLink.findMany()).sort((a, b) => a.order - b.order),
    };
});