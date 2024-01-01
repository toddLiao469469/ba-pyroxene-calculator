<script lang="ts">
	import { cn } from '$lib/utils';

	type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'p';
	export let variant: Variant = 'p';
</script>

{#if variant === 'h1'}
	<h1 class={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', $$props.class)}>
		<slot />
	</h1>
{:else if variant === 'h2'}
	<h2
		class={cn(
			'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
			$$props.class
		)}
	>
		<slot />
	</h2>
{:else if variant === 'h3'}
	<h3 class={cn('scroll-m-20 text-2xl font-semibold tracking-tight', $$props.class)}>
		<slot />
	</h3>
{:else if variant === 'h4'}
	<h4 class={cn('scroll-m-20 text-xl font-semibold tracking-tight', $$props.class)}>
		<slot />
	</h4>
{:else}
	<p class={cn('leading-7 [&:not(:first-child)]:mt-6', $$props.class)}>
		<slot />
	</p>
{/if}
