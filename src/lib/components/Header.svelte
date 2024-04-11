<script lang="ts">
	import { Github, Home } from 'lucide-svelte';

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

	<div class="ml-auto mr-4 flex items-center gap-x-4">
		<div>
			{version}
		</div>
		<a href="https://github.com/toddLiao469469/ba-pyroxene-calculator" target="_blank">
			<Github />
		</a>
		<ColorModeToggle />
	</div>
</header>
