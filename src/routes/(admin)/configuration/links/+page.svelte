<script lang="ts">
    import DraggableList from '$components/DraggableList.svelte';
    import LinkButton from '$components/LinkButton.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<DraggableList list={data.userLinks} let:item let:active>
    <LinkButton
        linkItem={{
            name: item.title,
            sub: item.subTitle,
            icon: item.icon,
            url: `/configuration/links/${item.id}`
        }}
    />
    <hr hidden={!active} />
</DraggableList>

<LinkButton
    linkItem={{
        name: 'Add new',
        url: `/configuration/links/new`
    }}
/>
