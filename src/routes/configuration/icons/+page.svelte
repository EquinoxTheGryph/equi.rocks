<script lang="ts">
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

{#each data.icons as item}
	<p>{item.name} : {item.data}</p>
{/each}
