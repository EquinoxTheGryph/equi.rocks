<script lang="ts">
    import type { UserLink } from '@prisma/client';
    import type { UserLinkType } from '@prisma/client';
    import { toHeaderCase } from 'js-convert-case';

    /**
     * NOTE: Can not use the actual UserLinkType, 
     * since there is a bug when building the project.
     * For now, this will be hardcoded in...
     * @see https://github.com/prisma/prisma/issues/12504
     */
    const userLinkType = ['DESCRIPTION', 'LINK', 'TITLE'];

    export let item: UserLink | null = null;
    export let delayed = false;
    export let disabled = false;

    let type: UserLinkType = item?.type ?? 'LINK';
</script>

<input type="hidden" name="id" value={item?.id ?? ''} {disabled} />

<label for="type">Type</label>
<select name="type" bind:value={type} {disabled}>
    {#each userLinkType as item}
        <option value={item}>{toHeaderCase(item)}</option>
    {/each}
</select>

<label for="title">Title</label>
<input name="title" type="text" value={item?.title ?? ''} {disabled} />

{#if type != 'TITLE'}
    <label for="content">Content</label>
    <textarea name="content" value={item?.content ?? ''} {disabled} />
{/if}

{#if type == 'LINK'}
    <hr />
    <label for="url">Url</label>
    <input name="url" type="url" value={item?.url ?? ''} {disabled} />

    <label for="icon">Icon path</label>
    <input name="icon" type="text" value={item?.icon ?? ''} {disabled} />
{/if}

<button>
    Edit{#if delayed}ing...{/if}
</button>
