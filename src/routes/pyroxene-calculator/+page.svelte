<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import Typography from '$lib/components/Typography.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';
	import RaidRankSelect from '$lib/components/RaidRankSelect.svelte';
	import MonthlyCardSelect from '$lib/components/MonthlyCardSelect.svelte';
	import ArenaRankSelect from '$lib/components/ArenaRankSelect.svelte';
	import PyroxeneResult from '$lib/views/PyroxeneResult.svelte';
	import EventTable from '$lib/views/EventTable.svelte';

	import { pyroxene } from '$store/pyroxene';
</script>

<div class="px-4 w-full md:w-4/5 lg:w-2/3 mx-auto">
	<div class="flex justify-center flex-col">
		<Typography variant="h1">青輝石計算機</Typography>

		<div class="grid gap-y-12 items-center mt-12">
			<div class="grid grid-cols-2 gap-y-2">
				<Label for="initPyroxene">現在擁有的青輝石</Label>
				<Input class="w-full" type="number" bind:value={$pyroxene.initPyroxene} />

				<Label for="daysValue">要存到的日期</Label>
				<Calendar bind:value={$pyroxene.targetDate}></Calendar>

				<Label>競技場每日青輝石</Label>
				<ArenaRankSelect bind:value={$pyroxene.dailyPyroxeneOfArena} />

				<Label>總力戰檔位</Label>
				<RaidRankSelect bind:value={$pyroxene.raidRank} />

				<Label>有無買月卡</Label>
				<MonthlyCardSelect bind:value={$pyroxene.monthlyCard} />

				<Label>活動挑戰任務完成比率 : {$pyroxene.questCompletedRate}%</Label>
				<Slider bind:value={$pyroxene.questCompletedRate} max={100} step={1} />
			</div>

			<div>
				<Typography variant="h3">試算結果</Typography>
				<PyroxeneResult />
			</div>

			<div>
				<Typography variant="h3">活動列表</Typography>
				<EventTable />
			</div>
		</div>
	</div>
</div>
