<script lang="ts">
    import { nanoid } from "nanoid";
    import Test from "./modules/Test.svelte";
    import type { SvelteComponent } from "svelte";

    const id = nanoid()

    let el: SvelteComponent | null = null

    function insert() {
        el?.$destroy();
        const target = document.getElementById(id)!
        target.innerHTML = "";
        el = new Test({
            target
        })
        console.log(el)

        el.$on('update', (a) => console.log(a))
    }
</script>

<div class="">
    <button on:click={() => insert()}>Click to insert an element!</button>
    <div {id}>This should get replaced</div>
</div>