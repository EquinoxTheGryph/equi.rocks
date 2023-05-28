<script lang="ts">
    import type { UserLink } from '@prisma/client';
    import { UserLinkType } from '@prisma/client';
    import { toHeaderCase } from 'js-convert-case';

    export let item: UserLink | null = null;
    export let delayed = false;
    export let disabled = false;

    let type: UserLinkType = item?.type ?? 'LINK';
</script>

<input type="hidden" name="id" value={item?.id ?? ''} {disabled} />

<label for="type">Type</label>
<select name="type" bind:value={type} {disabled}>
    {#each Object.values(UserLinkType).filter(item => item != 'OTHER') as item}
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

<button>Edit{#if delayed}ing...{/if}</button>
