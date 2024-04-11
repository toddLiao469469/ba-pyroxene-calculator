<script>
	import './styles.css';

	import { ModeWatcher } from 'mode-watcher';

	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<div class="app">
	<ModeWatcher />
	<Header />
	<main>
		<Toaster />
		<slot />
	</main>
	<Footer />
</div>
