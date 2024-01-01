<script lang="ts">
	import EventRow from '$lib/components/EventRow.svelte';
	import { events } from '$lib/data/event';
	import { pyroxene } from '$store/pyroxene';

	$: targetDate = $pyroxene.targetDate['toDate']?.();
</script>

<div class="grid">
	<div class="grid grid-cols-12 gap-x-2 gap-y-4 max-w-4xl">
		<p class="hidden col-span-1 lg:block">日期</p>
		<p class="hidden col-span-1 lg:block">天數</p>
		<p class="col-span-2 lg:hidden">日期 <br /> 天數</p>

		<p class="col-span-4">活動名稱</p>
		<p class="col-span-2">基礎值</p>
		<p class="col-span-2">調整值</p>
		<p class="col-span-2">最後獲得</p>
	</div>

	{#each events as event, index}
		<EventRow
			class="grid grid-cols-12 gap-x-2 gap-y-4 max-w-4xl xl:h-14  md:h-24 sm:h-24 items-center p-1"
			{index}
			{event}
			targetDay={targetDate}
			raidRank={$pyroxene.raidRank}
		/>
	{/each}
</div>
