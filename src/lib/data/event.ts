import { z } from 'zod';
import eventData from './event.json';

export enum EventType {
	Normal = 'NORMAL',
	Raid = 'RAID',
	Challenge = 'CHALLENGE',
	EliminationRaid = 'ELIMINATION_RAID'
}

export enum RaidPyroxeneType {
	Basic = 'BASIC',
	Ranking = 'RANKING'
}

export enum RaidArmorType {
	Heavy = 'HEAVY',
	Special = 'SPECIAL',
	Light = 'LIGHT'
}

export enum RaidLocationType {
	Indoor = 'INDOOR',
	Outdoor = 'OUTDOOR',
	Urban = 'URBAN'
}

// avoid conflict with built-in Event
export interface IEvent {
	date: string;
	name: string;
	pyroxene?: number;
	eventType: EventType;
	RaidPyroxeneType?: RaidPyroxeneType;
	description?: string;
	raidArmorType?: RaidArmorType;
	raidLocationType?: RaidLocationType;
}

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
