<script lang="ts">
	import { format } from 'date-fns/fp';

	import {
		daysOfCalculation,
		pyroxene,
		pyroxeneOfArena,
		pyroxeneOfEvents,
		pyroxeneOfMonthlyCard,
		systemPyroxene,
		totalAvailableRolls,
		totalPyroxene
	} from '$store/pyroxene';
</script>

<div>
	<div class="grid grid-cols-2">
		<p class="col-span-2">
			今天是 {format('yyyy-MM-dd')(new Date())}
		</p>
		<p class="col-span-2">
			總共存天數：{$daysOfCalculation}
		</p>

		<p class="text-cyan-500">
			月卡青輝石 : {$pyroxeneOfMonthlyCard}
		</p>

		<p class="text-yellow-500">
			競技場青輝石 : {$pyroxeneOfArena}
		</p>
		<p class="col-span-2 text-violet-500">
			每日任務＋登入＋每週任務青輝石 : {$systemPyroxene}
		</p>
		<p class="col-span-2 text-primary">
			活動基礎獎勵及維修 + 總力戰 + 大決戰 + (挑戰任務 * 完成比例) : <br />
			{$pyroxeneOfEvents.generalEvent}
			+
			{$pyroxeneOfEvents.raidEvent}
			+
			{$pyroxeneOfEvents.eliminationRaidEvent}
			+
			{$pyroxeneOfEvents.challengeEvent}
			* {$pyroxene.questCompletedRate}% = {$pyroxeneOfEvents.pyroxene}
		</p>

		<p class="col-span-2">預計會存到：</p>
		<p class="col-span-2">
			{$pyroxene.initPyroxene}
			+
			<span class="text-cyan-500">
				{$pyroxeneOfMonthlyCard}
			</span>
			+
			<span class="text-yellow-500">
				{$pyroxeneOfArena}
			</span>
			+
			<span class="text-violet-500">
				{$systemPyroxene}
			</span>
			+
			<span class="text-primary">
				{$pyroxeneOfEvents.pyroxene}
			</span>
		</p>

		<p class="col-span-2">
			= {$totalPyroxene} 青輝石
		</p>
		<p class="col-span-2">
			+ {$pyroxene.recruitmentTicket} 召募券
		</p>
		<p class="col-span-2">
			=
			{$totalAvailableRolls.guarantee} 井 +
			{$totalAvailableRolls.restRolls} 單抽
		</p>
	</div>
</div>
