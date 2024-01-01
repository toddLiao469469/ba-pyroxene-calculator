<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { Selected } from 'bits-ui';
	import { MonthlyCard } from '$lib/types';

	const monthlyCardList = [
		{ value: MonthlyCard.Both, label: '大小月卡' },
		{ value: MonthlyCard.Big, label: '大月卡' },
		{ value: MonthlyCard.Small, label: '小月卡' },
		{ value: MonthlyCard.None, label: '無' }
	];
	export let value: MonthlyCard;

	const onSelectedChange = (event: Selected<MonthlyCard> | undefined) => {
		if (!event) {
			return;
		}

		value = event.value;
		return event;
	};
</script>

<Select.Root
	portal={null}
	{onSelectedChange}
	selected={{
		value: value,
		label: monthlyCardList.find((item) => item.value === value)?.label
	}}
>
	<Select.Trigger class="w-full">
		<Select.Value placeholder="Select a fruit" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>總力戰檔位</Select.Label>
			{#each monthlyCardList as raidRank}
				<Select.Item value={raidRank.value} label={raidRank.label}>{raidRank.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="monthlyCard" bind:value />
</Select.Root>
