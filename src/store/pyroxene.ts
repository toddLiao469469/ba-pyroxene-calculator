import {
	getEventPyroxene,
	getMonthlyCardPyroxene,
	getSystemPyroxene,
	pyroxeneToRolls
} from '$lib/utils';
import { derived, writable } from 'svelte/store';
import { addDays, differenceInCalendarDays, isBefore, isAfter } from 'date-fns/fp';

import { browser } from '$app/environment';
import { events } from '$lib/data/event';
import { MonthlyCard, RaidRank } from '$lib/types';

const getToday = () => new Date();

const storedPyroxene = browser
	? localStorage.getItem('pyroxene')
		? {
				...JSON.parse(localStorage.getItem('pyroxene') as string),
				targetDate: new Date(JSON.parse(localStorage.getItem('pyroxene') as string).targetDate)
			}
		: null
	: null;

interface PyroxeneStore {
	initPyroxene: string;
	dailyPyroxeneOfArena: string;
	ticket: number;
	targetDate: Date;
	raidRank: RaidRank;
	monthlyCard: MonthlyCard;
	questCompletedRate: number;
	recruitmentTicket: number;
}

const getInitPyroxeneStore = (): PyroxeneStore => ({
	initPyroxene: '24000',
	dailyPyroxeneOfArena: '45',
	ticket: 0,
	targetDate: addDays(30)(getToday()),
	raidRank: RaidRank.Rank_1,
	monthlyCard: MonthlyCard.Both,
	questCompletedRate: 100,
	recruitmentTicket: 0
});

export const pyroxene = writable<PyroxeneStore>(
	storedPyroxene ? storedPyroxene : getInitPyroxeneStore()
);

pyroxene.subscribe((value) => {
	if (browser) {
		const draftData = {
			...value,
			targetDate: value.targetDate
		};

		localStorage.setItem('pyroxene', JSON.stringify(draftData));
	}
});

export const resetPyroxene = () => {
	pyroxene.update(() => getInitPyroxeneStore());
};

export const daysOfCalculation = derived<typeof pyroxene, number>(pyroxene, ($pyroxene) => {
	return differenceInCalendarDays(getToday())($pyroxene.targetDate);
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
		if (!$pyroxene.targetDate) {
			return false;
		}
		const date = new Date(event.date);

		return isBefore($pyroxene.targetDate, date) && isAfter(getToday(), date);
	});
	const rate = $pyroxene.questCompletedRate / 100;

	const result = includedEvents.reduce(
		(acc, event) => {
			if (event.eventType === 'RAID') {
				acc.raidEvent += getEventPyroxene(event, $pyroxene.raidRank);
				acc.pyroxene += getEventPyroxene(event, $pyroxene.raidRank);
				return acc;
			}
			if (event.eventType === 'CHALLENGE') {
				acc.challengeEvent += getEventPyroxene(event, $pyroxene.raidRank, 1);
				acc.pyroxene += getEventPyroxene(event, $pyroxene.raidRank, rate);
				return acc;
			}
			if (event.eventType === 'ELIMINATION_RAID') {
				acc.eliminationRaidEvent += getEventPyroxene(event, $pyroxene.raidRank);
				acc.pyroxene += getEventPyroxene(event, $pyroxene.raidRank);
				return acc;
			}
			if (event.eventType) {
				acc.generalEvent += getEventPyroxene(event, $pyroxene.raidRank);
				acc.pyroxene += getEventPyroxene(event, $pyroxene.raidRank);
				return acc;
			}

			return acc;
		},
		{
			generalEvent: 0,
			raidEvent: 0,
			challengeEvent: 0,
			eliminationRaidEvent: 0,
			pyroxene: 0
		}
	);

	return result;
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
		Number(initPyroxene) +
		$pyroxeneOfArena +
		$pyroxeneOfMonthlyCard +
		$systemPyroxene +
		$pyroxeneOfEvents.pyroxene
);

export const totalAvailableRolls = derived(
	[totalPyroxene, pyroxene],
	([$totalPyroxene, { recruitmentTicket }]) =>
		pyroxeneToRolls($totalPyroxene + recruitmentTicket * 120)
);
