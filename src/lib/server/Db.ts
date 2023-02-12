import { env } from '$env/dynamic/private';
import knex from "knex";

export const db = knex({
    client: 'pg',
    connection: {
        host: env.DB_HOST ?? '127.0.0.1',
        port: parseInt(env.DB_PORT) ?? 5432,
        user: env.DB_USER ?? 'postgres',
        password: env.DB_PASSWORD ?? 'postgres',
        database: env.DB_DATABASE ?? 'postgres',
    }
});