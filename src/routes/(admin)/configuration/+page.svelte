<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

{JSON.stringify($page.data.session)}
 