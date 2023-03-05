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
			<th scope="col" data-name={column.name}>
				{column.title ?? column.name}
			</th>
		{/each}
	</tr>
	{#each value as row, index}
		<tr data-index={index}>
			{#each columns as column}
				{@const _value = row[column.name]}
				{#if column.highlight}
					<th scope="row" data-name={column.name}>
						<slot {column} {row} value={_value}>
							{_value}
						</slot>
					</th>
				{:else}
					<td data-name={column.name}>
						<slot {column} {row} value={_value}>
							{_value}
						</slot>
					</td>
				{/if}
			{/each}
		</tr>
	{/each}
</table>

<style lang="postcss">
	td,
	th {
		@apply border-collapse border border-own-400 p-1;
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
