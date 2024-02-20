<script lang="ts">
	import { EventType, RaidArmorType, events, type IEvent } from '$lib/data/event';
	import { pyroxene } from '$store/pyroxene';
	import * as Table from '$lib/components/ui/table';
	import { differenceInCalendarDays, format } from 'date-fns/fp';
	import { getEventPyroxene } from '$lib/utils';

	const today = new Date().setHours(0, 0, 0, 0);
	const targetDate = $pyroxene.targetDate;

	const includedEvents = events.filter(({ date }) => {
		return new Date(date).setHours(0, 0, 0, 0) >= today;
	});

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
	<Table.Header>
		<Table.Row>
			<Table.Head>日期</Table.Head>
			<Table.Head class="w-1/2">活動名稱</Table.Head>
			<Table.Head class="w-1/3">青輝石獲得數</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each includedEvents as event, i (i)}
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
							event.eventType === EventType.Raid}
					>
						{Math.floor(
							getEventPyroxene(event, $pyroxene.raidRank, $pyroxene.questCompletedRate / 100)
						)}
					</span>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
