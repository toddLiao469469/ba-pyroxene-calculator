<script lang="ts">
	import { MonthlyCard } from '$lib/types';
	import { getMonthlyCardPyroxene, getSystemPyroxene } from '$lib/utils';

	export let initPyroxene: number;
	export let monthCard: MonthlyCard;
	export let days: number;
	export let pyroxeneOfArena: number;

	export let totalPyroxene: number;
</script>

<div>
	<div class="grid grid-cols-2">
		<p class="col-span-2">
			總共存天數：{days}
		</p>

		<p class="text-cyan-500">
			月卡石頭 : {getMonthlyCardPyroxene(monthCard, days)}
		</p>

		<p class="text-yellow-500">
			競技場石頭 : {pyroxeneOfArena}
		</p>
		<p class="col-span-2 text-teal-500">
			每日任務＋登入＋每週任務石頭 : {getSystemPyroxene(days)}
		</p>

		<p class="col-span-2">
			總共石頭 :
			{initPyroxene}
			+
			<span class="text-teal-500">
				{getSystemPyroxene(days)}
			</span>
			+
			<span class="text-cyan-500">
				{getMonthlyCardPyroxene(monthCard, days)}
			</span>
			+
			<span class="text-yellow-500">
				{pyroxeneOfArena}
			</span>
			=
			{totalPyroxene}
		</p>
	</div>
</div>
