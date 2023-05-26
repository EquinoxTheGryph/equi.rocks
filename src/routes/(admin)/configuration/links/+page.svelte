<script lang="ts">
    import DraggableList from '$components/DraggableList.svelte';
    import LinkButton from '$components/LinkButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import Dialog from '$components/Dialog.svelte';
    import LinkEditFormContent from '$components/LinkEditFormContent.svelte';

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

    data.userLinks = data.userLinks.sort((a, b) => a.order - b.order);
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
    <Dialog open={index == edit} modal on:afterClose={() => (edit = -1)}>
        <form method="POST" action="?/edit" class="flex w-80 flex-col gap-2" use:enhance>
            <LinkEditFormContent {item} />
        </form>
    </Dialog>
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
<Dialog open={-2 == edit} modal>
    <form method="POST" action="?/edit" class="flex w-80 flex-col gap-2" use:enhance>
        <LinkEditFormContent />
    </form>
</Dialog>
