<script lang="ts">
    import { clickOutside } from '$lib/client/click_outside';
    import { fly } from 'svelte/transition';
    import { createEventDispatcher, tick } from 'svelte';
    import { setTimeoutPromise } from '$lib/base/Util';

    const dispatch = createEventDispatcher();
    const duration = 125

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

            await setTimeoutPromise(duration);

            dispatch('afterClose');
        }
    }
</script>

{#if _open}
    <dialog
        bind:this={dialogElement}
        class="modal backdrop:bg-primary-900 z-popup rounded bg-primary-dark text-primary shadow-lg backdrop:bg-opacity-50 backdrop:backdrop-blur-lg p-0"
        class:close={false}
        transition:fly={{ duration, y: 12.5 }}
    >
        <div
            use:clickOutside
            on:clickOutside={() => {
                if (!locked) setState(false);
            }}
            class="p-4"
        >
            <slot />
        </div>
    </dialog>
{/if}
