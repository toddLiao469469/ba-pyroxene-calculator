<script lang="ts">
	import EventRow from '$lib/components/EventRow.svelte';
	import { events } from '$lib/data/event';
	import { pyroxene } from '$store/pyroxene';

	const today = new Date().setHours(0, 0, 0, 0);
	const includedEvents = events.filter(({ date }) => {
		return new Date(date).setHours(0, 0, 0, 0) >= today;
	});
</script>

<div>
	<div class="grid grid-cols-12 gap-x-2 gap-y-4 max-w-4xl">
		<p class="hidden col-span-1 lg:block">日期</p>
		<p class="hidden col-span-1 lg:block">天數</p>
		<p class="col-span-2 lg:hidden">日期 <br /> 天數</p>

		<p class="col-span-6">活動名稱</p>
		<p class="col-span-2">基礎值</p>
		<p class="col-span-2">最後獲得</p>
	</div>

	{#each includedEvents as event, index}
		<EventRow
			class="grid grid-cols-12 gap-x-2 gap-y-4 max-w-4xl min-h-14  items-center"
			{index}
			{event}
			raidRank={$pyroxene.raidRank}
		/>
	{/each}
</div>
