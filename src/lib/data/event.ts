import { z } from 'zod';
import eventData from './event.json';

export enum EventType {
	// 一般活動
	Normal = 'NORMAL',
	//總力戰
	Raid = 'RAID',
	// 活動挑戰任務
	Challenge = 'CHALLENGE',
	// 大決戰
	EliminationRaid = 'ELIMINATION_RAID'
}

export enum RaidPyroxeneType {
	//總力戰基礎獎勵
	Basic = 'BASIC',
	// 總力戰排名獎勵
	Ranking = 'RANKING'
}

export enum RaidArmorType {
	//重裝甲
	Heavy = 'HEAVY',
	//特殊裝甲
	Special = 'SPECIAL',
	//輕裝甲
	Light = 'LIGHT'
}

export enum RaidLocationType {
	//室內
	Indoor = 'INDOOR',
	//室外
	Outdoor = 'OUTDOOR',
	//都市
	Urban = 'URBAN'
}

type GeneralEvent = {
	eventType: EventType.Challenge | EventType.Normal;
};

type RaidEvent = {
	eventType: EventType.Raid;
	raidArmorType: RaidArmorType;
	raidLocationType: RaidLocationType;
};

type EliminationRaidEvent = {
	eventType: EventType.EliminationRaid;
	raidArmorType: RaidArmorType;
};

// avoid conflict with built-in Event
export type IEvent = { date: string; name: string; pyroxene?: number; description?: string } & (
	| GeneralEvent
	| RaidEvent
	| EliminationRaidEvent
);

const eventSchema = z.object({
	date: z.string(),
	name: z.string(),
	pyroxene: z.number().optional(),
	eventType: z.nativeEnum(EventType),
	RaidPyroxeneType: z.nativeEnum(RaidPyroxeneType).optional(),
	description: z.string().optional(),
	raidArmorType: z.nativeEnum(RaidArmorType).optional(),
	raidLocationType: z.nativeEnum(RaidLocationType).optional()
});

const eventsSchema = z.array(eventSchema);

export const validateEvent = (data: unknown): data is IEvent[] => {
	try {
		eventsSchema.parse(data);
		return true;
	} catch (error) {
		console.error(error, 'Event data is invalid');
		return false;
	}
};

const getEvents = (): IEvent[] => {
	if (validateEvent(eventData)) {
		return eventData;
	}

	throw new Error('Event data is invalid');
};

export const events = getEvents();
