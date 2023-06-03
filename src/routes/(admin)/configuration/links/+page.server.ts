import { db } from '$lib/server/Db';
import { UserLinkType, type UserLink } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
    id: z.string().uuid().nullish(),
    title: z.string().min(2).max(64),
    content: z.string().max(2048).nullish(),
    url: z.string().max(2048).nullish(),
    icon: z.string().max(2048).default('').nullish(),
    type: z.nativeEnum(UserLinkType)
});

const deleteSchema = z.object({
    id: z.string().uuid()
});

type Check<T extends z.infer<typeof schema>> = T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _tmp = Check<UserLink>;

export const actions = {
    edit: async ({ request }) => {
        const form = await superValidate(request, schema);

        if (!form.valid) {
            return fail(400, { form });
        }

        const data = <Omit<typeof form.data, 'id'>>(
            Object.fromEntries(Object.entries(form.data).filter(([key, val]) => key != 'id'))
        );

        if (!form.data.id) await db.userLink.create({ data });
        else await db.userLink.update({ data, where: { id: form.data.id } });

        // Yep, return { form } here too
        return { form };
    },
    delete: async ({ request }) => {
        const form = await superValidate(request, deleteSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        await db.userLink.delete({ where: { id: form.data.id } });

        return { form };
    }
} satisfies Actions;

export const load = (async () => {
    const form = await superValidate(null, schema);

    return {
        userLinks: db.userLink.findMany(),
        form
    };
}) satisfies PageServerLoad;
