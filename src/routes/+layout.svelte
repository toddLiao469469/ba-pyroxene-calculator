<script>
	import  Header  from '$lib/components/Header.svelte';
	import './styles.css';

	import { ModeWatcher } from 'mode-watcher';
</script>

<div class="app">
	<ModeWatcher />
	
	<Header />
	<main>
		<slot />
	</main>
</div>
