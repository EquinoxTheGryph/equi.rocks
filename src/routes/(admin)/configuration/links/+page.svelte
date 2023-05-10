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
</script>

<DraggableList list={data.userLinks} draggable={edit == -1} let:item let:active let:index>
    <LinkButton
        linkItem={{
            name: item.title,
            sub: item.subTitle,
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
                <input name="subTitle" type="text" value={item?.subTitle ?? ''} />
            </label>
            <label>
                Url
                <input name="url" type="url" value={item?.url ?? ''} />
            </label>
            <label>
                Icon
                <select name="icon" value={item?.icon ?? null}>
                    <option value={null}>-- No Icon --</option>
                    {#each data.icons as icon}
                        <option value={icon.name}>{icon.name}</option>
                    {/each}
                </select>
            </label>
            <button>Edit</button>
        </form>
    </div>
    <hr hidden={!active} />
</DraggableList>

<LinkButton
    linkItem={{
        name: 'Add new',
        sub: ''
    }}
    on:click={() => edit = -2}
/>
<div class="absolute z-popup rounded bg-primary-dark" hidden={-2 != edit}>
    <form method="POST" action="?/edit" class="flex flex-col gap-2" use:enhance>
        <input type="hidden" name="id" value='' />
        <label>
            Title
            <input name="title" type="text" value='' />
        </label>
        <label>
            Subtitle
            <input name="subTitle" type="text" value='' />
        </label>
        <label>
            Url
            <input name="url" type="url" value='' />
        </label>
        <label>
            Icon
            <select name="icon" value={null}>
                <option value={null}>-- No Icon --</option>
                {#each data.icons as icon}
                    <option value={icon.name}>{icon.name}</option>
                {/each}
            </select>
        </label>
        <button>Edit</button>
    </form>
</div>