import { db } from '$lib/server/Db';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
	id: z.string().nullish(),
	title: z.string(),
	subTitle: z.string(),
	url: z.string(),
	icon: z.string().default(''),
})

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
	  const data = Object.fromEntries(Object.entries(form.data).filter(([key, val]) => key != 'id'));

	  if (!form.data.id) await db('userLink').insert(data);
	  else await db('userLink').where('id', '=', form.data.id).update(data)
  
	  // Yep, return { form } here too
	  return { form };
	}
  } satisfies Actions;

export const load = (async () => {
	const form = await superValidate(null, schema);

	return {
		userLinks: db.from('userLink'),
		icons: db.from('icon'),
		form
	};
}) satisfies PageServerLoad;
