<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import './styles.css';

	import { ModeWatcher } from 'mode-watcher';
</script>

<div class="app">
	<ModeWatcher />
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>
