import { env } from '$env/dynamic/private';
import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import bcrypt from 'bcrypt';
import * as OTPAuth from 'otpauth';
import { z } from 'zod';

const totp = new OTPAuth.TOTP({
    algorithm: 'SHA256',
    digits: 6,
    period: 30,
    secret: env.ADMIN_TOTP_SECRET
});

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
                name: 'credentials',
                credentials: {
                    username: { label: 'speng glob' },
                    password: { label: 'ungo sploingo', type: 'password' },
                    token: { label: 'lofa', type: 'password' }
                },
                async authorize(request) {
                    // return {
                    //     id: '0',
                    //     name: 'admin'
                    // }

                    const schema = z.object({
                        username: z.literal(env.ADMIN_USER),
                        password: z.string().max(128),
                        token: z.string().length(6).regex(/\d{6}/, 'Only numbers are allowed')
                    });

                    const result = schema.safeParse(request);

                    if (!result.success) return null;

                    const passwordCorrect = await bcrypt.compare(
                        String(result.data.password),
                        env.ADMIN_PASS
                    );

                    const totpCorrect = totp.validate({
                        token: result.data.token,
                        window: 1
                    }) !== null;

                    return passwordCorrect && totpCorrect
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
        pages: {
            signIn: '/user/signin',
            signOut: '/user/signout',
            error: '/user/error'
        },
        secret: env.ADMIN_SECRET
    }),
    authorization
) satisfies Handle;
