<script lang="ts">
	import { differenceInCalendarDays, format } from 'date-fns/fp';

	import { EventType, type IEvent, RaidArmorType } from '$lib/data/event';
	import type { RaidRank } from '$lib/types';
	import { cn, getEventPyroxene } from '$lib/utils';
	import { pyroxene } from '$store/pyroxene';

	export let event: IEvent;
	export let raidRank: RaidRank;
	export let targetDate: Date;

	const today = new Date().setHours(0, 0, 0, 0);
	$: isAfterTargetDate = differenceInCalendarDays(targetDate, new Date(event.date)) > 0;
	$: eventDateFromToday = differenceInCalendarDays(today, new Date(event.date));

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

	$: rowColor = getRowColor(event);
</script>

<div class={cn($$props.class)}>
	<p class=" hidden col-span-1 lg:block">
		{format('MM/dd', event.date)}
	</p>
	<p class="hidden col-span-1 lg:block">
		{eventDateFromToday}
	</p>

	<p class="col-span-2 lg:hidden">
		{format('MM/dd', event.date)}
		<br />
		{eventDateFromToday}
	</p>

	<p class={`col-span-6 flex flex-col ${rowColor} p-2`}>
		{#if Boolean(event.description)}
			<p>{event.name}</p>
			<p class="font-bold">{event.description}</p>
		{:else}
			<p>{event.name}</p>
		{/if}
	</p>
	<p class="col-span-2" class:opacity-20={isAfterTargetDate}>{getEventPyroxene(event, raidRank)}</p>
	<p class="col-span-2" class:opacity-20={isAfterTargetDate}>
		<span
			class:text-rose-400={event.eventType === EventType.Challenge ||
				event.eventType === EventType.Raid}
		>
			{Math.floor(getEventPyroxene(event, raidRank, $pyroxene.questCompletedRate / 100))}
		</span>
	</p>
</div>

<style>
	p {
		font-size: small;
	}
</style>
