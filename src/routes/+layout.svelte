<script>
	import './styles.css';
	import ColorModeToggle from '$lib/components/ColorModeToggle.svelte';
	import { ModeWatcher } from 'mode-watcher';
</script>

<div class="app">
	<ModeWatcher />
	<ColorModeToggle />
	<main>
		<slot />
	</main>
</div>
