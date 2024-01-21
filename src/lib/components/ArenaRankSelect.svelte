<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { Selected } from 'bits-ui';

	const arenaRankList = [
		{ value: '45', label: '45' },
		{ value: '40', label: '40' },
		{ value: '35', label: '35' },
		{ value: '30', label: '30' },
		{ value: '25', label: '25' },
		{ value: '20', label: '20' },
		{ value: '18', label: '18' },
		{ value: '16', label: '16' },
		{ value: '14', label: '14' },
		{ value: '12', label: '12' },
		{ value: '10', label: '10' }
	];
	export let value = '45';

	const onSelectedChange = (event: Selected<string> | undefined) => {
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
		label: arenaRankList.find((item) => item.value === value)?.label
	}}
>
	<Select.Trigger class="w-full">
		<Select.Value placeholder="Select a fruit" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>競技場每日青輝石</Select.Label>
			{#each arenaRankList as raidRank}
				<Select.Item value={raidRank.value} label={raidRank.label}>{raidRank.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="monthlyCard" bind:value />
</Select.Root>
