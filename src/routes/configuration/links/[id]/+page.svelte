<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

Add mode: {!data.userLink}

<form method="POST" action="?/edit" class="flex flex-col gap-2">
	<label>
		Title
		<input name="title" type="text" value={data.userLink?.title ?? ''} />
	</label>
	<label>
		Subtitle
		<input name="subTitle" type="text" value={data.userLink?.subTitle ?? ''} />
	</label>
	<label>
		Url
		<input name="url" type="url" value={data.userLink?.url ?? ''} />
	</label>
	<label>
		Icon
		<select name="icon" value={data.userLink?.icon ?? null}>
			<option value={null}>-- No Icon --</option>
			{#each data.availableIcons as icon}
				<option value={icon.name}>{icon.name}</option>
			{/each}
		</select>
	</label>
	<button>Edit</button>
</form>
