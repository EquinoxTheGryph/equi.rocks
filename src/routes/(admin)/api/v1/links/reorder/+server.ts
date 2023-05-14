import { db } from '$lib/server/Db.js';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
    items: z.array(z.string().uuid())
});

export const POST = async ({ request }) => {
    const form = await superValidate(await request.json(), schema);
    if (!form.valid) return actionResult('failure', { form });

    try {
        await db.$transaction(
            form.data.items.map((item, index) =>
                db.userLink.update({ where: { id: item }, data: { order: index } })
            )
        );
    } catch (error) {
        console.error(error);
        actionResult('error', 'There was an error while performing this action', 500);
    }

    return actionResult('success', { form });
};
