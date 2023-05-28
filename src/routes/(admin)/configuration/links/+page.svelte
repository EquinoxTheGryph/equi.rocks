<script lang="ts">
    import DraggableList from '$components/DraggableList.svelte';
    import LinkButton from '$components/LinkButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import Dialog from '$components/Dialog.svelte';
    import LinkEditFormContent from '$components/LinkEditFormContent.svelte';
    import UserLinkView from '$components/UserLinkView.svelte';
    import { onMount, tick } from 'svelte';
    import type { UserLink } from '@prisma/client';
    import { confirm } from '$components/GlobalDialog.svelte';
    import { invalidateAll } from '$app/navigation';

    export let data: PageData;

    const { form, enhance, delayed, submitting } = superForm(data.form, {
        onUpdated(event) {
            edit = -1;
            sortNow();
        }
    });

    let edit = -1;
    let reordered = false;
    let disableAnimation = false;

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

    function confirmDelete(item: UserLink) {
        confirm("Delete item")
            .then((selection) => {
                if (selection == 'confirm') {
                    const data = new FormData();

                    data.set('id', item.id);

                    return fetch('?/delete', {
                        method: 'POST',
                        body: data
                    });
                }
            })
            .then(() => {
                invalidateAll();
            });
    }

    async function sortNow() {
        disableAnimation = true;
        data.userLinks = data.userLinks.sort((a, b) => a.order - b.order);
        await tick();
        disableAnimation = false;
    }

    sortNow();
</script>

<article class="flex flex-col items-center p-2 text-center">
    <h1>Edit Links</h1>
    <p class="opacity-80">Click on an item below to edit its information</p>
    <p class="opacity-80">Drag an item to edit its order (Don't forget to apply)</p>
</article>

<DraggableList
    list={data.userLinks}
    draggable={edit == -1}
    {disableAnimation}
    on:itemMove={() => (reordered = true)}
    let:item
    let:active
    let:index
>
    <UserLinkView
        userLink={item}
        editing={true}
        on:click={() => (edit = edit == index ? -1 : index)}
        on:deleteClick={() => confirmDelete(item)}
    />
    <hr hidden={!active} />
</DraggableList>

{#if reordered}
    <LinkButton
        linkItem={{
            title: 'Apply Reorder'
        }}
        on:click={applyReorder}
    />
{/if}

<LinkButton
    linkItem={{
        title: 'Add new'
    }}
    on:click={() => (edit = -2)}
/>

<Dialog open={-1 != edit} modal on:afterClose={() => (edit = -1)}>
    <form method="POST" action="?/edit" class="flex w-80 flex-col gap-2" use:enhance>
        <LinkEditFormContent
            item={edit == -1 ? null : edit == -2 ? null : data.userLinks[edit]}
            delayed={$delayed}
            disabled={$submitting}
        />
    </form>
</Dialog>
