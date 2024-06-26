import { type ClassValue, clsx } from 'clsx';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { twMerge } from 'tailwind-merge';

import { EventType, type IEvent } from '$lib/data/event';

import { MonthlyCard, RaidRank } from './types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const getMonthlyCardPyroxene = (monthlyCard: MonthlyCard, numbersOfDay: number): number => {
	const numbersOfMonths = Math.floor(numbersOfDay / 30);
	switch (monthlyCard) {
		case MonthlyCard.Both:
			return 60 * numbersOfDay + 568 * numbersOfMonths;
		case MonthlyCard.Big:
			return 40 * numbersOfDay + 392 * numbersOfMonths;
		case MonthlyCard.Small:
			return 20 * numbersOfDay + 176 * numbersOfMonths;
		case MonthlyCard.None:
			return 0;
		default:
			return 0;
	}
};

export const getSystemPyroxene = (numbersOfDay: number): number => {
	return (
		20 * numbersOfDay + 120 * Math.floor(numbersOfDay / 7) + 150 * Math.floor(numbersOfDay / 10)
	);
};

export const getRaidPyroxene = (raidRank: RaidRank): number => {
	switch (raidRank) {
		case RaidRank.Rank_1:
			return 1200;
		case RaidRank.Rank_2:
			return 1000;
		case RaidRank.Rank_3:
			return 800;
		case RaidRank.Rank_4:
			return 600;
		default:
			return 0;
	}
};

export const getEventPyroxene = (
	event: IEvent,
	raidRank: RaidRank,
	questCompletedRate: number = 1
): number => {
	switch (event.eventType) {
		case EventType.Raid:
			if (event.raidPyroxeneType === 'BASIC') {
				return event.pyroxene || 0;
			}
			return getRaidPyroxene(raidRank);
		case EventType.Challenge:
			return Math.round((event.pyroxene || 0) * questCompletedRate);
		default:
			if (event.pyroxene) {
				return event.pyroxene;
			}
	}
	return 0;
};

export const pyroxeneToRolls = (
	pyroxene: number
): {
	guarantee: number;
	restRolls: number;
} => {
	const rolls = Math.floor(pyroxene / 120);
	const guarantee = Math.floor(rolls / 200);
	return {
		guarantee,
		restRolls: rolls - guarantee * 200
	};
};
