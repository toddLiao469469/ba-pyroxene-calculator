<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { releaseNotes, ReleaseNoteType } from '$lib/data/release-note';

	function releaseNoteTypeToEmoji(type: ReleaseNoteType) {
		switch (type) {
			case ReleaseNoteType.Feature:
				return '🚀';
			case ReleaseNoteType.Fix:
				return '🐛';
			case ReleaseNoteType.Improvement:
				return '🔧';
			case ReleaseNoteType.Data:
				return '📊';
			default:
				return '';
		}
	}
	let showMore = false;
	$: displayReleaseNotes = showMore ? releaseNotes : releaseNotes.slice(0, 5);
</script>

{#if releaseNotes.length > 5}
	<div class="mb-6">
		<Button on:click={() => (showMore = !showMore)}>顯示更多</Button>
	</div>
{/if}

{#each displayReleaseNotes as note}
	<div class="mb-6">
		<div class="flex">
			<div class="mr-2">
				版本：<span class="text-primary">{note.version}</span>
			</div>
			<div>
				發布日期：{note.releaseDate}
			</div>
		</div>

		<ol class="ml-6 list-decimal [&>li]:mt-2">
			{#each note.descriptions as { type, content }}
				<li>
					<span class="mr-1">
						{releaseNoteTypeToEmoji(type)}
					</span>
					<span>
						{content}
					</span>
				</li>
			{/each}
		</ol>
	</div>
{/each}
