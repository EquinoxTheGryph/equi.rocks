<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	import { signIn, signOut } from '@auth/sveltekit/client';

	export let data: PageData;
</script>

<!-- <button on:click={() => signOut()}>Sign Out</button>
<button on:click={() => signIn()}>Sign In</button> -->

{JSON.stringify($page.data.session)}
 