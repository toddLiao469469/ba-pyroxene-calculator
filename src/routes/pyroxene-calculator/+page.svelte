<script lang="ts">
	import { format } from 'date-fns/fp';

	import Calendar from '$lib/components/Calendar.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';

	import RaidRankSelect from '$lib/components/RaidRankSelect.svelte';
	import MonthlyCardSelect from '$lib/components/MonthlyCardSelect.svelte';
	import ArenaRankSelect from '$lib/components/ArenaRankSelect.svelte';
	import PyroxeneResult from '$lib/views/PyroxeneResult.svelte';
	import EventTable from '$lib/views/EventTable.svelte';
	import { pyroxene, pyroxeneOfEvents } from '$store/pyroxene';

	const today = new Date();
	$: console.log($pyroxeneOfEvents , $pyroxene.questCompletedRate);
</script>

<div class="px-4 w-full md:w-4/5 lg:w-2/3 mx-auto">
	<div class="flex justify-center flex-col">
		<h1 class="scroll-m-20 tracking-tight text-4xl font-600">存石計算機</h1>
		<p>
			今天是 {format('yyyy-MM-dd')(today)}
		</p>

		<div class="grid gap-y-12 items-center mt-2">
			<div class="grid grid-cols-2 gap-y-2">
				<Label for="initPyroxene">現在擁有的石頭</Label>
				<Input class="w-full" type="number" bind:value={$pyroxene.initPyroxene} />

				<Label for="daysValue">要存到的日期</Label>
				<Calendar bind:value={$pyroxene.targetDate}></Calendar>

				<Label>競技場每日石頭</Label>
				<ArenaRankSelect bind:value={$pyroxene.dailyPyroxeneOfArena} />

				<Label>總力戰檔位</Label>
				<RaidRankSelect bind:value={$pyroxene.raidRank} />

				<Label>有無買月卡</Label>
				<MonthlyCardSelect bind:value={$pyroxene.monthlyCard} />

				<Label>活動挑戰任務完成比率 : {$pyroxene.questCompletedRate}%</Label>
				<Slider bind:value={$pyroxene.questCompletedRate} max={100} step={1} />
			</div>

			<PyroxeneResult />
			<EventTable />
		</div>
	</div>
</div>
