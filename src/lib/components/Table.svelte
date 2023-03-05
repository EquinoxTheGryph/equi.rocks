<script lang="ts" context="module">
	export interface IColumn<T extends Record<string, any>> {
		name: keyof T;
		title?: string;
		highlight?: boolean;
	}
</script>

<script lang="ts">
	type T = $$Generic<Record<string, any>>;

	export let columns: IColumn<T>[];
	export let value: T[];
</script>

<table>
	<tr>
		{#each columns as column}
			<th scope="col" data-name={column.name}>{column.title ?? column.name}</th>
		{/each}
	</tr>
	{#each value as row, index}
		<tr data-index={index}>
			{#each columns as column}
				{#if column.highlight}
					<th scope="row" data-name={column.name}>{row[column.name] ?? ''}</th>
				{:else}
					<td data-name={column.name}>{row[column.name] ?? ''}</td>
				{/if}
			{/each}
		</tr>
	{/each}
</table>

<style lang="postcss">
	td,
	th {
        @apply p-1 border border-collapse border-own-400;
	}

	td {
        @apply text-center;
	}

	tr:nth-child(even) {
        @apply bg-own-700;
	}

	th[scope='col'] {
        @apply bg-own-600;
	}

	th[scope='row'] {
        @apply bg-own-600;
	}
</style>
