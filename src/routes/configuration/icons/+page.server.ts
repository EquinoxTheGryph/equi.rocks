import type { PageServerLoad } from './$types';
import { db } from '$lib/server/Db';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import type { Icon } from '$models/Tables';
 
export const actions = {
  new: async (event) => {
    const data = await event.request.formData();

    const iconName = data.get('name');
    const iconData = data.get('data');

    if (!iconName) return fail(422, { iconName, missing: true })
    if (!iconData) return fail(422, { iconData, missing: true })

    const icon: Icon = {
        name: iconName.toString(),
        data: iconData.toString(),
    }

    await db.insert(icon).into('icon')
  }
} satisfies Actions;

export const load = (async () => {
    return {
        icons: db.from('icon')
    };
}) satisfies PageServerLoad;