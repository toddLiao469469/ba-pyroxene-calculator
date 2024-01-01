<script lang="ts">
	import {
		pyroxene,
		totalPyroxene,
		systemPyroxene,
		pyroxeneOfMonthlyCard,
		pyroxeneOfArena,
		daysOfCalculation
	} from '$store/pyroxene';


</script>

<div>
	<div class="grid grid-cols-2">
		<p class="col-span-2">
			總共存天數：{$daysOfCalculation}
		</p>

		<p class="text-cyan-500">
			月卡石頭 : {$pyroxeneOfMonthlyCard}
		</p>

		<p class="text-yellow-500">
			競技場石頭 : {$pyroxeneOfArena}
		</p>
		<p class="col-span-2 text-teal-500">
			每日任務＋登入＋每週任務石頭 : {$systemPyroxene}
		</p>

		<p class="col-span-2">
			總共石頭 :
			{$pyroxene.initPyroxene}
			+
			<span class="text-teal-500">
				{$systemPyroxene}
			</span>
			+
			<span class="text-cyan-500">
				{$pyroxeneOfMonthlyCard}
			</span>
			+
			<span class="text-yellow-500">
				{$pyroxeneOfArena}
			</span>
			=
			{$totalPyroxene}
		</p>
	</div>
</div>
