<script lang="ts">
	import { Home } from 'lucide-svelte';

	import { browser } from '$app/environment';
	import { version } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	import ColorModeToggle from './ColorModeToggle.svelte';

	let currentPath = browser ? location.pathname : '';

	afterNavigate(() => {
		currentPath = browser ? location.pathname : '';
	});
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
		<a href="/pyroxene-calculator"> 青輝石計算機 </a>
	</div>
	<div class="ml-auto">
		v{version}
	</div>
	<ColorModeToggle class="ml-4 mr-4" />
</header>
