import {
	getEventPyroxene,
	getMonthlyCardPyroxene,
	getSystemPyroxene,
	pyroxeneToRolls
} from '$lib/utils';
import { derived, writable } from 'svelte/store';
import { fromDate, type DateValue } from '@internationalized/date';
import { addDays, differenceInCalendarDays, isBefore, isAfter } from 'date-fns/fp';

import { browser } from '$app/environment';
import { events } from '$lib/data/event';
import { MonthlyCard, RaidRank } from '$lib/types';
import { TW_TIMEZONE } from '$lib/contants';

const today = new Date();

/**
 * 其實有關 `targetDate` 的部分會這麼複雜是因為
 * calendar 的部分是跟 `internationalized` 高度耦合
 * 且不知道為什麼直接將 internationalized 的 `DateValue` 物件存進 localStorage
 * 會出現錯誤
 * 所以目前變成存去 localStorage 的時候，將 `DateValue` 物件轉成 `Date`
 * 但是這樣的話，每次從 localStorage 拿出來的時候，就要再轉回 `DateValue` 物件
 *
 * 另外就是 internationalized 本身 API 沒多好用，所以我都會再轉成 Date 再使用 date-fns 的 API進行處理。
 * 但這部分的確寫的很醜，之後有空再重構吧。
 */

const storedPyroxene = browser
	? localStorage.getItem('pyroxene')
		? {
				...JSON.parse(localStorage.getItem('pyroxene') as string),
				targetDate: fromDate(
					new Date(JSON.parse(localStorage.getItem('pyroxene') as string).targetDate),
					TW_TIMEZONE
				)
			}
		: null
	: null;

interface PyroxeneStore {
	initPyroxene: string;
	dailyPyroxeneOfArena: string;
	ticket: number;
	targetDate: DateValue;
	raidRank: RaidRank;
	monthlyCard: MonthlyCard;
	questCompletedRate: number;
	recruitmentTicket: number;
}

export const pyroxene = writable<PyroxeneStore>(
	storedPyroxene
		? storedPyroxene
		: {
				initPyroxene: 24_000,
				dailyPyroxeneOfArena: '45',
				ticket: 0,
				targetDate: fromDate(addDays(30)(today), TW_TIMEZONE),
				raidRank: RaidRank.Rank_1,
				monthlyCard: MonthlyCard.Both,
				questCompletedRate: 100,
				recruitmentTicket: 0
			}
);

pyroxene.subscribe((value) => {
	if (browser) {
		const draftData = {
			...value,
			targetDate: value.targetDate?.toDate(TW_TIMEZONE)
		};

		localStorage.setItem('pyroxene', JSON.stringify(draftData));
	}
});

export const daysOfCalculation = derived<typeof pyroxene, number>(pyroxene, ($pyroxene) => {
	return differenceInCalendarDays(today)($pyroxene.targetDate?.toDate(TW_TIMEZONE));
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
		if (!$pyroxene.targetDate?.toDate(TW_TIMEZONE)) {
			return false;
		}
		const date = new Date(event.date);

		return isBefore($pyroxene.targetDate.toDate(TW_TIMEZONE), date) && isAfter(today, date);
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
