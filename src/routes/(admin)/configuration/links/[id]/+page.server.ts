import { db } from '$lib/server/Db';
import type { UserLink } from '$models/Tables';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	edit: async (event) => {
		const addMode = event.params.id == 'new';
		const data = await event.request.formData();

		const linkTitle = data.get('title');
		const linkSubTitle = data.get('subTitle');
		const linkUrl = data.get('url');
		const linkIcon = data.get('icon');

		if (!linkTitle) return fail(422, { linkTitle, missing: true });
		if (!linkSubTitle) return fail(422, { linkSubTitle, missing: true });
		if (!linkUrl) return fail(422, { linkUrl, missing: true });
		if (!linkIcon) return fail(422, { linkIcon, missing: true });

		const userLink: UserLink = {
			title: linkTitle.toString(),
			subTitle: linkSubTitle.toString(),
			url: linkUrl.toString(),
			icon: linkIcon.toString()
		};

		if (addMode) await db('userLink').insert(userLink);
		else await db('userLink').where('id', '=', event.params.id).update(userLink);
	}
} satisfies Actions;

export const load = (async (data) => {
	const icons = db.from('icon');

	if (data.params.id == 'new') {
		return {
			availableIcons: icons
		};
	}

	return {
		userLink: db.from('userLink').where('id', '=', data.params.id).first(),
		availableIcons: icons
	};
}) satisfies PageServerLoad;
