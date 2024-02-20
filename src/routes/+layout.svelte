<script>
	import './styles.css';

	import { ModeWatcher } from 'mode-watcher';

	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="app">
	<ModeWatcher />
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>
