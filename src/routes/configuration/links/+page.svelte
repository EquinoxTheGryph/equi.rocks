<script lang="ts">
	import Table from '$components/Table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form method="POST" action="?/new">
	<label>
		Name
		<input name="name" type="text" />
	</label>
	<label>
		Data
		<input name="data" type="text" />
	</label>
	<button>Add</button>
</form>

<Table
	columns={[
		{ name: 'title', title: 'Title', highlight: true },
		{ name: 'subTitle', title: 'Sub Title' },
		{ name: 'url', title: 'Url' },
	]}
	value={data.userLinks}
/>
