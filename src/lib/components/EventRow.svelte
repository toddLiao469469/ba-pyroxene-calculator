<script lang="ts">
	import { differenceInCalendarDays, format } from 'date-fns/fp';
	import type { RaidRank } from '$lib/types';
	import { cn, getEventPyroxene } from '$lib/utils';
	import { EventType, type IEvent, RaidArmorType } from '$lib/data/event';
	import { pyroxene } from '$store/pyroxene';

	export let event: IEvent;
	export let targetDay: Date;
	export let raidRank: RaidRank;

	$: days = differenceInCalendarDays(new Date(event.date), targetDay);

	function getRowColor(event: IEvent) {
		if (event.eventType === EventType.Raid) {
			switch (event.raidArmorType) {
				case RaidArmorType.Heavy:
					return 'bg-yellow-400';
				case RaidArmorType.Light:
					return 'bg-red-400';
				case RaidArmorType.Special:
					return 'bg-blue-400';
			}
		}

		if (event.eventType === EventType.EliminationRaid) {
			return 'bg-emerald-400';
		}

		return '';
	}

	$: rowColor = days > 0 && getRowColor(event);
</script>

<div class={cn($$props.class)} class:opacity-20={days < 0}>
	<p class=" hidden col-span-1 lg:block">
		{format('MM/dd', event.date)}
	</p>
	<p class="hidden col-span-1 lg:block">
		{days >= 0 ? days : 0}
	</p>

	<p class="col-span-2 lg:hidden">
		{format('MM/dd', event.date)}
		<br />
		{days >= 0 ? days : 0}
	</p>

	<p class={`col-span-6 flex flex-col ${rowColor} p-2`}>
		{#if Boolean(event.description)}
			<p>{event.name}</p>
			<p class="font-bold">{event.description}</p>
		{:else}
			<p>{event.name}</p>
		{/if}
	</p>
	<p class="col-span-2">{getEventPyroxene(event, raidRank)}</p>
	<p class="col-span-2">
		<span
			class:text-rose-400={days >= 0 &&
				(event.eventType === EventType.Challenge || event.eventType === EventType.Raid)}
		>
			{days >= 0
				? Math.floor(getEventPyroxene(event, raidRank, $pyroxene.questCompletedRate / 100))
				: 0}
		</span>
	</p>
</div>

<style scoped>
	p {
		font-size: small;
	}
</style>
