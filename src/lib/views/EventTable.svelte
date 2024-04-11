<script lang="ts">
	import { differenceInCalendarDays, format } from 'date-fns/fp';

	import * as Table from '$lib/components/ui/table';
	import { EventType, type IEvent, RaidArmorType, RaidPyroxeneType } from '$lib/data/event';
	import { RaidRank } from '$lib/types';
	import { getEventPyroxene } from '$lib/utils';

	export let targetDate = new Date();
	export let raidRank: RaidRank = RaidRank.Rank_1;
	export let questCompletedRate = 100;
	export let events: IEvent[] = [];

	function getRowColor(event: IEvent) {
		if (event.eventType === EventType.Raid) {
			switch (event.raidArmorType) {
				case RaidArmorType.Heavy:
					return 'text-yellow-500';
				case RaidArmorType.Light:
					return 'text-red-500';
				case RaidArmorType.Special:
					return 'text-blue-500';
			}
		}

		if (event.eventType === EventType.EliminationRaid) {
			return 'text-emerald-500';
		}

		return '';
	}
</script>

<Table.Root>
	<Table.Header class="sticky top-0">
		<Table.Row class="bg-primary">
			<Table.Head class="text-white">日期</Table.Head>
			<Table.Head class="w-1/2 text-white">活動名稱</Table.Head>
			<Table.Head class="w-1/3 text-white">青輝石獲得數</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each events as event, i (i)}
			<Table.Row>
				<Table.Cell>
					{format('MM/dd', event.date)}
				</Table.Cell>

				<Table.Cell>
					<span class={`${getRowColor(event)}`}>{event.name}</span>

					{#if Boolean(event.description)}
						<br />
						<span class="font-bold leading-10">
							{event?.description}
						</span>
					{/if}
				</Table.Cell>
				<Table.Cell>
					<span
						class:opacity-20={differenceInCalendarDays(targetDate, new Date(event.date)) > 0}
						class:text-red-300={event.eventType === EventType.Challenge ||
							(event.eventType === EventType.Raid &&
								event.raidPyroxeneType === RaidPyroxeneType.Ranking)}
					>
						{Math.floor(getEventPyroxene(event, raidRank, questCompletedRate / 100))}
					</span>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
