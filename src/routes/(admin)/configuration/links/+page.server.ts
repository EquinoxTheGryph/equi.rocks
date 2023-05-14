import { db } from '$lib/server/Db';
import { fail, json } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
    id: z.string().uuid().nullish(),
    title: z.string(),
    content: z.string(),
    url: z.string(),
    icon: z.string().default('')
});

export const actions = {
    edit: async ({ request }) => {
        const form = await superValidate(request, schema);
        console.log('POST', form);

        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }

        // TODO: Do something with the validated data
        const data = <Omit<typeof form.data, 'id'>>(
            Object.fromEntries(Object.entries(form.data).filter(([key, val]) => key != 'id'))
        );

        if (!form.data.id) await db.userLink.create({ data });
        else await db.userLink.update({ data, where: { id: form.data.id } });

        // Yep, return { form } here too
        return { form };
    },
    applyReorder: async ({ request }) => { 
        return json({hello: 'world'})
    }
} satisfies Actions;

export const load = (async () => {
    const form = await superValidate(null, schema);

    return {
        userLinks: db.userLink.findMany(),
        form
    };
}) satisfies PageServerLoad;
