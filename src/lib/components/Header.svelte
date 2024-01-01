<script lang="ts">
	import ColorModeToggle from './ColorModeToggle.svelte';
	import { Home } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	let currentPath = browser ? location.pathname : '';

    afterNavigate(() => {
        currentPath = browser ? location.pathname : '';
    })

</script>

<header class="flex justify-start items-center py-2">
	<div class="w-24 flex justify-center items-center" class:text-primary={currentPath === '/'}>
		<a href="/">
			<Home />
		</a>
	</div>

	<div
		class="w-40 flex justify-center items-center"
		class:text-primary={currentPath === '/pyroxene-calculator'}
	>
		<a href="/pyroxene-calculator"> 石頭計算機 </a>
	</div>
	<ColorModeToggle class="ml-auto mr-4" />
</header>

<style scoped>
</style>
