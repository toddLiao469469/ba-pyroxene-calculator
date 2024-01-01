<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import { Input } from '$lib/components/ui/input';
	import { differenceInDays, format, addDays } from 'date-fns/fp';
	import { type DateValue, fromDate } from '@internationalized/date';
	import { Label } from '$lib/components/ui/label';
	import RaidRankSelect from '$lib/components/RaidRankSelect.svelte';
	import { MonthlyCard, RaidRank } from '$lib/types';
	import MonthlyCardSelect from '$lib/components/MonthlyCardSelect.svelte';
	import { getMonthlyCardPyroxene, getSystemPyroxene } from '$lib/utils';
	import ArenaRankSelect from '$lib/components/ArenaRankSelect.svelte';
	import PyroxeneResult from '$lib/views/PyroxeneResult.svelte';
	import EventTable from '$lib/views/EventTable.svelte';

	const today = new Date();
	let initPyroxene = 24_000;
	let dailyPyroxeneOfArena: string;
	let daysValue: DateValue = fromDate(addDays(7)(today), 'Asia/Taipei');
	let raidRank: RaidRank = RaidRank.RANK_1;
	let monthCard: MonthlyCard = MonthlyCard.BOTH;

	$: days = differenceInDays(today)(daysValue?.toDate('Asia/Taipei'));
	$: pyroxeneOfArena = Number(dailyPyroxeneOfArena) * days;

	$: totalPyroxene =
		Number(initPyroxene) +
		getMonthlyCardPyroxene(monthCard, days) +
		pyroxeneOfArena +
		getSystemPyroxene(days);

	$: console.log('initPyroxene', initPyroxene, daysValue?.toDate('Asia/Taipei'), raidRank);
</script>

<div>
	<h1 class="scroll-m-20 tracking-tight text-4xl font-600">存石計算機</h1>

	<p>
		今天是 {format('yyyy-MM-dd')(today)}
	</p>

	<div class="grid max-w-xl gap-y-12 items-center px-4">
		<div class="grid grid-cols-2 gap-y-2">
			<Label for="initPyroxene">現在擁有的石頭</Label>
			<Input class="w-full" type="number" bind:value={initPyroxene} />

			<Label for="daysValue">要存到的日期</Label>
			<Calendar bind:value={daysValue}></Calendar>

			<Label>競技場每日石頭</Label>
			<ArenaRankSelect bind:value={dailyPyroxeneOfArena} />

			<Label>總力戰檔位</Label>
			<RaidRankSelect bind:value={raidRank} />

			<Label>有無買月卡</Label>
			<MonthlyCardSelect bind:value={monthCard} />
		</div>

		<PyroxeneResult {initPyroxene} {monthCard} {days} {pyroxeneOfArena} {totalPyroxene} />
		<EventTable value={daysValue?.toDate('Asia/Taipei')} {raidRank} />
	</div>
</div>
