<script lang="ts">
	import { fromDate } from '@internationalized/date';

	import { pyroxene, resetPyroxene } from '$store/pyroxene';
	import { TW_TIMEZONE } from '$lib/contants';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';
	import { Button } from '$lib/components/ui/button';
	import Calendar from '$lib/components/Calendar.svelte';
	import Typography from '$lib/components/Typography.svelte';
	import RaidRankSelect from '$lib/components/RaidRankSelect.svelte';
	import MonthlyCardSelect from '$lib/components/MonthlyCardSelect.svelte';
	import ArenaRankSelect from '$lib/components/ArenaRankSelect.svelte';
	import PyroxeneResult from '$lib/views/PyroxeneResult.svelte';
	import EventTable from '$lib/views/EventTable.svelte';

	let calendarDate = fromDate(new Date($pyroxene.targetDate), TW_TIMEZONE);
	$: $pyroxene.targetDate = calendarDate.toDate();
</script>

<div class="px-6 w-full md:w-4/5 lg:w-2/3 mx-auto">
	<div class="flex justify-center flex-col">
		<Typography variant="h1">青輝石計算機</Typography>
		<Button
			variant="destructive"
			class="w-24  ml-auto"
			on:click={() => {
				resetPyroxene();
			}}>清除資料</Button
		>

		<div class="grid gap-y-12 items-center mt-12">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
				<div class="input-container">
					<Label for="initPyroxene">現在擁有的青輝石</Label>
					<Input class="w-full" type="number" bind:value={$pyroxene.initPyroxene} />
				</div>
				<div class="input-container">
					<Label for="initPyroxene">現在擁有的召募券</Label>
					<Input class="w-full" type="number" bind:value={$pyroxene.recruitmentTicket} />
				</div>
				<div class="input-container">
					<Label for="daysValue">要存到的日期</Label>
					<Calendar bind:value={calendarDate} />
				</div>
				<div class="input-container">
					<Label>競技場每日青輝石</Label>
					<ArenaRankSelect bind:value={$pyroxene.dailyPyroxeneOfArena} />
				</div>
				<div class="input-container">
					<Label>總力戰檔位</Label>
					<RaidRankSelect bind:value={$pyroxene.raidRank} />
				</div>
				<div class="input-container">
					<Label>有無買月卡</Label>
					<MonthlyCardSelect bind:value={$pyroxene.monthlyCard} />
				</div>

				<div class="input-container">
					<Label>活動挑戰任務完成比率 : {$pyroxene.questCompletedRate}%</Label>
					<Slider
						value={[$pyroxene.questCompletedRate]}
						max={100}
						step={1}
						onValueChange={(value) => {
							$pyroxene.questCompletedRate = value[0];
						}}
					/>
				</div>
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

<style>
	.input-container {
		display: grid;
		gap: 0.5rem;
	}
</style>
