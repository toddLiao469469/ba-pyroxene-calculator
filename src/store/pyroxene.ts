import { events } from '$lib/data/event';
import { MonthlyCard, RaidRank } from '$lib/types';
import { getEventPyroxene, getMonthlyCardPyroxene, getSystemPyroxene } from '$lib/utils';
import { fromDate } from '@internationalized/date';

import { addDays, differenceInCalendarDays, isBefore, isAfter } from 'date-fns/fp';
import { derived, writable } from 'svelte/store';

const today = new Date();

export const pyroxene = writable({
	initPyroxene: 24_000,
	dailyPyroxeneOfArena: '45',
	ticket: 0,
	targetDate: fromDate(addDays(30)(today), 'Asia/Taipei'),
	raidRank: RaidRank.Rank_1,
	monthlyCard: MonthlyCard.Both,
	questCompletedRate: 100
});

export const daysOfCalculation = derived<typeof pyroxene, number>(pyroxene, ($pyroxene) => {
	return differenceInCalendarDays(today)($pyroxene.targetDate?.toDate());
});

export const pyroxeneOfArena = derived(
	[pyroxene, daysOfCalculation],
	([$pyroxene, $daysOfCalculation]) => {
		return $daysOfCalculation * Number($pyroxene.dailyPyroxeneOfArena);
	}
);

export const pyroxeneOfMonthlyCard = derived(
	[pyroxene, daysOfCalculation],
	([$pyroxene, $daysOfCalculation]) =>
		getMonthlyCardPyroxene($pyroxene.monthlyCard, $daysOfCalculation)
);

export const systemPyroxene = derived(daysOfCalculation, ($daysOfCalculation) =>
	getSystemPyroxene($daysOfCalculation)
);

export const pyroxeneOfEvents = derived(pyroxene, ($pyroxene) => {
	const includedEvents = events.filter((event) => {
		if(!$pyroxene.targetDate?.toDate()){
			return false;
		}
		const date = new Date(event.date);

		return isBefore($pyroxene.targetDate.toDate(), date) && isAfter(today, date);
	});
	const rate = $pyroxene.questCompletedRate / 100;

	return {
		basicPyroxene: includedEvents.reduce((acc, event) => {
			return acc + getEventPyroxene(event, $pyroxene.raidRank, 1);
		}, 0),
		pyroxene: includedEvents.reduce((acc, event) => {
			return acc + getEventPyroxene(event, $pyroxene.raidRank, rate);
		}, 0)
	};
});

export const totalPyroxene = derived(
	[pyroxene, pyroxeneOfArena, pyroxeneOfMonthlyCard, systemPyroxene, pyroxeneOfEvents],
	([
		{ initPyroxene },
		$pyroxeneOfArena,
		$pyroxeneOfMonthlyCard,
		$systemPyroxene,
		$pyroxeneOfEvents
	]) =>
		initPyroxene +
		$pyroxeneOfArena +
		$pyroxeneOfMonthlyCard +
		$systemPyroxene +
		$pyroxeneOfEvents.pyroxene
);

export const totalAvailableRolls = derived(totalPyroxene, ($totalPyroxene) => {
	const rolls = Math.floor($totalPyroxene / 120);
	const guarant = Math.floor(rolls / 200);
	return {
		guarant,
		restRolls: rolls - guarant * 200
	};
});
