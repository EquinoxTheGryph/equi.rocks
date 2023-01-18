import { db } from '$lib/server/Db';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	test: async (event) => {
		return { success: true };
	}
};
