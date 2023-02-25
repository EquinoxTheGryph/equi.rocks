/**
 * Note: To use the tables in knex, define them in `Db.ts`
 */

/**
 * File Table
 */
export interface File {
	id: string;
	parent: string;
	name: string;
	title: string;
	description: string;
	mimeType: string;
	data: string;
	metadata: string;
	createdOn: string;
	modifiedOn: string;
}

/**
 * Icon Table
 */
export interface Icon {
	name: string;
	data: string;
}

/**
 * UserLink Table
 */
export interface UserLink {
	id: string;
	title: string;
	subTitle: string;
	url: string;
	icon: string;
}

/**
 * Config Table
 */
export interface Config {
	name: string;
	data: string;
}