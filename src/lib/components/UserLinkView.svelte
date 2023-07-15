<script lang="ts">
    import { mdiDelete } from '@mdi/js';
    import type { UserLink } from '@prisma/client';
    import Icon from 'mdi-svelte';
    import { createEventDispatcher } from 'svelte';

    export let userLink: Partial<UserLink>;
    export let editing = false;

    const dispatch = createEventDispatcher();
</script>

<div class="group flex w-80 items-center">
    {#if userLink?.type == 'LINK'}
        <a
            draggable="false"
            on:click
            href={editing ? '#' : userLink.url}
            class="
            my-2
            flex
            w-full
            select-none
            rounded-full
            bg-secondary-dark
            p-2
            text-text-dark
            drop-shadow-lg
            transition-transform
            hover:scale-[1.025]
            hover:drop-shadow-sm
            active:translate-y-[2px]
        "
        >
            {#if userLink.icon}
                <span class="flex items-center px-1.5">
                    <Icon path={userLink.icon} />
                </span>
            {/if}

            <section class="flex-grow text-center">
                <p>
                    {userLink.title}
                </p>
                <p class="text-sm font-medium opacity-75">{userLink.content ?? ''}</p>
            </section>

            {#if userLink.icon}
                <span class="w-[24px] px-2" />
            {/if}
        </a>
    {:else if userLink?.type == 'TITLE'}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <h2 class="c-text mt-2 w-full text-xl" draggable="false" on:click>{userLink.title}</h2>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <h3 class="c-text w-full text-xl" draggable="false" on:click>UNSUPPORTED</h3>
    {/if}

    {#if editing}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="invisible cursor-pointer ps-2 text-text-dark opacity-50 hover:opacity-100 group-hover:visible"
            on:click={() => dispatch('deleteClick')}
        >
            <Icon path={mdiDelete} />
        </div>
    {/if}
</div>
