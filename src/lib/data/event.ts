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

export const events: IEvent[] = [
	{
		date: '2024-01-09',
		name: '維護',
		pyroxene: 600,
		eventType: EventType.Normal
	},
	{
		date: '2024-01-09',
		name: '室内葛利果',
		eventType: EventType.Raid,
		RaidPyroxeneType: RaidPyroxeneType.Ranking,
		raidArmorType: RaidArmorType.Light,
		raidLocationType: RaidLocationType.Indoor,
		description: '結算'
	},
	{
		date: '2024-01-16',
		name: '市街壽司',
		pyroxene: 650,
		eventType: EventType.EliminationRaid,
		RaidPyroxeneType: RaidPyroxeneType.Basic,
		description: '大決戰獎勵'
	},
	{
		date: '2024-01-23',
		name: '【復刻】阿拜多斯渡假村復舊對策委員會',
		pyroxene: 4240,
		eventType: EventType.Normal,
		description: '基礎 + 維護'
	},
	{
		date: '2024-01-24',
		name: '【復刻】阿拜多斯渡假村復舊對策委員會',
		pyroxene: 650,
		eventType: EventType.Challenge,
		description: '挑戰'
	},
	{
		date: '2024-01-30',
		name: '尋找隱藏的遺產～\n三一的課外活動～',
		pyroxene: 4240,
		eventType: EventType.Normal,
		description: '基礎 + 維護'
	},
	{
		date: '2024-01-31',
		name: '尋找隱藏的遺產～\n三一的課外活動～',
		pyroxene: 650,
		eventType: EventType.Challenge,
		description: '挑戰'
	},

	{
		date: '2024-02-06',
		name: '7日登入獎勵\n 「2.5周年記念ログインボーナス」',
		pyroxene: 1250,
		eventType: EventType.Normal,
		RaidPyroxeneType: RaidPyroxeneType.Basic
	},
	{
		date: '2024-02-13',
		name: '室外GOZ',
		eventType: EventType.Raid,
		pyroxene: 1250,
		RaidPyroxeneType: RaidPyroxeneType.Basic,
		raidArmorType: RaidArmorType.Special,
		raidLocationType: RaidLocationType.Outdoor,
		description: '總力戰基礎+成就'
	},
	{
		date: '2024-02-13',
		name: '室外GOZ',
		eventType: EventType.Raid,
		RaidPyroxeneType: RaidPyroxeneType.Ranking,
		raidArmorType: RaidArmorType.Special,
		raidLocationType: RaidLocationType.Outdoor,
		description: '結算'
	}
];
