<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { flip } from 'svelte/animate';

    type T = $$Generic;

    export let list: T[];
    export let draggable = true;

    const dispatch = createEventDispatcher<{
        itemMove: {
            item: T;
            from: number;
            to: number;
        };
    }>();

    let hovering: number | null = null;

    function handleDrop(event: DragEvent, index: number) {
        // Return if not a valid data type
        if (!event.dataTransfer) return;
        if (!event.dataTransfer.types.includes('custom/list-drag')) return;

        event.dataTransfer.dropEffect = 'move';
        const start = parseInt(event.dataTransfer.getData('custom/list-drag'));
        const newList = list;

        // Return if not a valid index or no movement
        if (isNaN(start) || start == index) return;

        // Mark operation as allowed
        event.preventDefault();

        // Move the item
        if (start < index) {
            newList.splice(index + 1, 0, newList[start]);
            newList.splice(start, 1);
        } else {
            newList.splice(index, 0, newList[start]);
            newList.splice(start + 1, 1);
        }

        // Assign the new list
        list = newList;

        dispatch('itemMove', { item: list[index], from: start, to: index });
    }

    function handleDragStart(event: DragEvent, index: number) {
        if (!event.dataTransfer) return;

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';

        event.dataTransfer.setData('custom/list-drag', String(index));
    }

    function handleDragOver(event: DragEvent, index: number) {
        // Return if not a valid data type
        if (!event.dataTransfer || !event.dataTransfer.types.includes('custom/list-drag')) {
            hovering = null;
            return;
        }

        // Mark operation as allowed
        event.preventDefault();
        hovering = index;
    }
</script>

{#each list as item, index (item)}
    <div
        class="cursor-grab"
        animate:flip={{ duration: 250 }}
        {draggable}
        on:dragstart={(event) => handleDragStart(event, index)}
        on:dragend={() => (hovering = null)}
        on:drop={(event) => handleDrop(event, index)}
        on:dragover={(event) => handleDragOver(event, index)}
    >
        <slot {item} {index} active={hovering === index} />
    </div>
{/each}
