<script lang="ts">
    import { clickOutside } from '$lib/client/click_outside';
    import { fly } from 'svelte/transition';
    import { createEventDispatcher, tick } from 'svelte';

    const dispatch = createEventDispatcher();

    export let open = true;
    export let locked = false;
    export let modal = false;

    let dialogElement: HTMLDialogElement | null;
    let _open = open;

    $: setState(open);

    async function setState(open: boolean) {
        if (open) {
            dispatch('beforeOpen');

            _open = true;

            await tick();

            if (modal) {
                dialogElement?.showModal();
            } else {
                dialogElement?.show();
            }

            await tick();

            dispatch('afterOpen');
        } else {
            dispatch('beforeClose');

            await tick();

            _open = false;

            await tick();

            dispatch('afterClose');
        }
    }
</script>

{#if _open}
    <dialog
        bind:this={dialogElement}
        class="modal z-popup rounded bg-primary-dark text-primary shadow-lg backdrop:bg-primary-900 backdrop:bg-opacity-50 backdrop:backdrop-blur-lg"
        class:close={false}
        transition:fly={{ duration: 125, y: 12.5 }}
    >
        <div
            use:clickOutside
            on:clickOutside={() => {
                if (!locked) setState(false);
            }}
        >
            <slot />
        </div>
    </dialog>
{/if}
