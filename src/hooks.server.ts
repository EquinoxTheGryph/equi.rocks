import { env } from '$env/dynamic/private';
import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const authorization: Handle = async ({ event, resolve }) => {
    // Protect any routes under /configuration
    if (event.route.id?.includes('(admin)')) {
        const session = await event.locals.getSession();
        if (!session) {
            throw redirect(303, '/auth/signin');
        }
    }

    return resolve(event);
};

export const handle = sequence(
    SvelteKitAuth({
        providers: [
            Credentials({
                name: 'oungh',
                credentials: {
                    username: { label: 'speng glob' },
                    password: { label: 'ungo sploingo', type: 'password' }
                },
                async authorize(request) {
                    const schema = z.object({
                        username: z.literal(env.ADMIN_USER),
                        password: z.string().max(128)
                    });

                    const result = schema.safeParse(request);

                    if (!result.success) return null;

                    return (await bcrypt.compare(String(result.data.password), env.ADMIN_PASS))
                        ? {
                              id: '0',
                              name: result.data.username
                          }
                        : null;
                }
            })
        ],
        theme: {
            colorScheme: 'dark'
        },
        secret: env.ADMIN_SECRET
    }),
    authorization
) satisfies Handle;
