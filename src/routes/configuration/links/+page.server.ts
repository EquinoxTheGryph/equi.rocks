import { db } from '$lib/server/Db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		userLinks: db.from('userLink')
	};
}) satisfies PageServerLoad;
