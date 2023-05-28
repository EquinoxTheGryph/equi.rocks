<!-- Only one of these should exist in the page -->
<script context="module" lang="ts">
    import { writable } from 'svelte/store';
    import { nanoid } from 'nanoid';
    import type { Maybe } from '$lib/base/Util';

    interface ConfirmContent {
        title: string;
        description: string;
        buttons: string[];
        apply: (choice?: string) => void;
    }

    const dialogMap = writable(new Map<string, ConfirmContent>());

    export function confirm(
        title?: string,
        description?: string,
        buttons?: string[]
    ): Promise<Maybe<string>> {
        const key = nanoid();

        let resolver: (value?: string) => void;

        const promise = new Promise<Maybe<string>>((res) => {
            resolver = res;
        });

        dialogMap.update((value) =>
            value.set(key, {
                title: title ?? 'Confirmation',
                description: description ?? 'Are you sure you want to continue?',
                buttons: buttons ?? ['confirm', 'cancel'],
                apply(choice) {
                    resolver(choice);
                    dialogMap.update((value) => {
                        value.delete(key);
                        return value;
                    });
                }
            })
        );

        return promise;
    }
</script>

<script lang="ts">
    import Dialog from './Dialog.svelte';
    import { toSentenceCase } from 'js-convert-case';
</script>

{#each Array.from($dialogMap) as [id, dialogContent]}
    <Dialog open modal on:afterClose={() => dialogContent?.apply?.()}>
        <h2>{dialogContent.title}</h2>
        <p>{dialogContent.description}</p>
        <div class="flex gap-3 mt-4 justify-end">
            {#each dialogContent.buttons as button}
                <button on:click={() => dialogContent?.apply?.(button)}>
                    {toSentenceCase(button)}
                </button>
            {/each}
        </div>
    </Dialog>
{/each}
