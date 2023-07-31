<!-- A special ComboBox with the ability to create new items -->
<script lang="ts">
    import { ComboBox } from 'carbon-components-svelte';
    import type {
        ComboBoxItem,
        ComboBoxProps
    } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';
    import { createEventDispatcher, tick } from 'svelte';

    export let items: ComboBoxItem[];
    export let value: ComboBoxProps['value'] = undefined;
    export let selectedId: ComboBoxProps['selectedId'] = undefined;
    export let addNewItemPrefix = 'Add new item: %n';
    export let clearOnSelect = false;

    const dispatch = createEventDispatcher<{
        newItem: string;
        select: ComboBoxItem;
    }>();

    let currentNewItemName = '';
    let valueWhenOpened = value ?? items[selectedId]?.text;

    let ref: HTMLInputElement;
    let clear: ComboBox['clear'];

    function filterGroupItem(item: ComboBoxItem, _value: string | undefined) {
        if (!_value) {
            if (item.id == -1) {
                return false;
            } else {
                return true;
            }
        }

        if (item.id == -1) {
            if (
                items.find((_item) => _item.text.toLowerCase() == (_value?.toLowerCase?.() ?? ''))
            ) {
                return false;
            }

            currentNewItemName = _value;
            return true;
        }

        if (valueWhenOpened == _value) return true;

        return item.text.toLowerCase().includes(_value?.toLowerCase?.() ?? '');
    }

    function handleGroupSelect(event: CustomEvent<any>) {
        if (event.detail.selectedId == -1) {
            const regex = new RegExp(`^${addNewItemPrefix.replace('%n', '(.*)')}$`);

            const newItem = currentNewItemName.replace(regex, '$1');
            dispatch('newItem', newItem);
            // console.log(newItem);

            currentNewItemName = '';
            // ref.blur();
            clear({ focus: true });
            selectedId = selectedId;
        } else {
            dispatch('select', items[selectedId]);
            if (clearOnSelect) {
                clear({ focus: true });
                selectedId = undefined;
            }
        }

        valueWhenOpened = value ?? items[selectedId]?.text;
    }
</script>

<ComboBox
    {...$$props}
    items={[...items, { id: '-1', text: `${addNewItemPrefix.replace('%n', currentNewItemName)}` }]}
    shouldFilterItem={filterGroupItem}
    bind:value
    bind:selectedId
    bind:ref
    bind:clear
    on:focus={() => (currentNewItemName = '')}
    on:select={handleGroupSelect}
>
    <!-- {#if $$slots}
        <slot />
    {/if} -->
</ComboBox>
