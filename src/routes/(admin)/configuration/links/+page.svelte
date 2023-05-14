<script lang="ts">
    import DraggableList from '$components/DraggableList.svelte';
    import LinkButton from '$components/LinkButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';

    export let data: PageData;

    const { form, enhance } = superForm(data.form, {
        onUpdated(event) {
            edit = -1;
        }
    });

    let edit = -1;
    let reordered = false;

    function applyReorder() {
        fetch('/api/v1/links/reorder', {
            method: 'POST',
            body: JSON.stringify({ items: data.userLinks.map((item) => item.id) })
        }).then((result) => {
            if (result.ok) {
                reordered = false;
            }
        });
    }

    data.userLinks = data.userLinks.sort((a, b) => a.order - b.order)
</script>

<DraggableList
    list={data.userLinks}
    draggable={edit == -1}
    on:itemMove={() => (reordered = true)}
    let:item
    let:active
    let:index
>
    <LinkButton
        linkItem={{
            name: item.title,
            sub: item.content,
            icon: item.icon
        }}
        on:click={() => (edit = edit == index ? -1 : index)}
    />
    <div class="absolute z-popup rounded bg-primary-dark" hidden={index != edit}>
        <form method="POST" action="?/edit" class="flex flex-col gap-2" use:enhance>
            <input type="hidden" name="id" value={item?.id ?? ''} />
            <label>
                Title
                <input name="title" type="text" value={item?.title ?? ''} />
            </label>
            <label>
                Subtitle
                <input name="content" type="text" value={item?.content ?? ''} />
            </label>
            <label>
                Url
                <input name="url" type="url" value={item?.url ?? ''} />
            </label>
            <label>
                Icon
                <input name="icon" type="text" value={item?.icon ?? ''} />
            </label>
            <button>Edit</button>
        </form>
    </div>
    <hr hidden={!active} />
</DraggableList>

{#if reordered}
    <LinkButton
        linkItem={{
            name: 'Apply Reorder'
        }}
        on:click={applyReorder}
    />
{/if}

<LinkButton
    linkItem={{
        name: 'Add new'
    }}
    on:click={() => (edit = -2)}
/>
<div class="absolute z-popup rounded bg-primary-dark" hidden={-2 != edit}>
    <form method="POST" action="?/edit" class="flex flex-col gap-2" use:enhance>
        <input type="hidden" name="id" value="" />
        <label>
            Title
            <input name="title" type="text" value="" />
        </label>
        <label>
            Content
            <input name="content" type="text" value="" />
        </label>
        <label>
            Url
            <input name="url" type="url" value="" />
        </label>
        <label>
            Icon
            <input name="icon" type="text" value="" />
        </label>
        <button>Edit</button>
    </form>
</div>
