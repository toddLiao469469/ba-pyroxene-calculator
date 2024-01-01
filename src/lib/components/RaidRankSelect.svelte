<script lang="ts">
	import type { Selected } from 'bits-ui';
	import * as Select from '$lib/components/ui/select';
	import { RaidRank } from '$lib/types';

	export let value: RaidRank;

	const raidRankList = [
		{ value: RaidRank.RANK_1, label: '一檔' },
		{ value: RaidRank.RANK_2, label: '二檔' },
		{ value: RaidRank.RANK_3, label: '三檔' },
		{ value: RaidRank.RANK_4, label: '四檔' }
	];

	const onSelectedChange = (event: Selected<RaidRank> | undefined) => {
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
		label: raidRankList.find((item) => item.value === value)?.label
	}}
>
	<Select.Trigger class="w-full">
		<Select.Value placeholder="總力戰檔位" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>總力戰檔位</Select.Label>
			{#each raidRankList as raidRank}
				<Select.Item value={raidRank.value} label={raidRank.label}>{raidRank.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="raidRank" bind:value />
</Select.Root>
