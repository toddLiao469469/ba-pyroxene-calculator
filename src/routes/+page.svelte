<script lang="ts">
	import { Github } from 'lucide-svelte';

	import Typography from '$lib/components/Typography.svelte';
	import { Button } from '$lib/components/ui/button';
	import ReleaseNoteTable from '$lib/views/ReleaseNoteTable.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="p-4 w-full md:w-2/3 flex justify-center flex-col m-auto">
	<Typography variant="h1">歡迎來到青輝石計算機</Typography>

	<Typography>
		這是根據巴哈貼文
		<a
			class="text-cyan-500"
			href="https://forum.gamer.com.tw/C.php?bsn=38898&snA=4506"
			target="_blank"
			>【工具】全華語圈最好用的青輝石計算器！小春、吹雪和優香都適合！《9/18 5.0大改版》</a
		>
		所做的網頁版青輝石計算機 <br />
		<a
			href="https://docs.google.com/spreadsheets/d/1HxwR8CqAw7UMm8M2c74EEXU7RqhnIIIeEZi8XK8aMRU/edit#gid=2117524808"
			target="_blank"
			class="text-cyan-500">原 excel 版本的計算器</a
		>
	</Typography>

	<Button class="w-48 mt-6 mx-auto" href="/pyroxene-calculator">開始使用</Button>

	<Typography variant="h2" class="my-4">專案資訊</Typography>

	<p>
		特別感謝原版作者<span class="text-teal-500">村長</span>、<span class="text-teal-500">夜貓</span
		>、<span class="text-teal-500">貓貓豪可愛</span>
	</p>
	<Typography variant="h3" class="mt-4">專案說明</Typography>
	<p>
		這是一個使用參考巴哈貼文，所做的網頁版青輝石計算機，目前還在緩慢開發中暫時先以原版的<span
			class="text-pink-300">小春及吹雪版</span
		>進行開發，歡迎各位提供意見與建議。
	</p>
	<Typography variant="h4" class="mt-4">問題回報與功能許願</Typography>
	<p>
		如果是有關 Bug 回報或者功能許願可以的話請至 <a
			href="https://github.com/toddLiao469469/ba-pyroxene-calculator/issues"
		>
			<Github class="inline" />
			<span class="text-cyan-500"> Github </span>
		</a> 新增 Issue，這樣我才能夠更好的追蹤問題。
	</p>

	<Typography variant="h3" class="mt-4">更新紀錄</Typography>
	<ReleaseNoteTable />
	<!-- <Typography variant="h3" class="mt-4">Contributors</Typography>
	<p>🚧 wip 🚧</p> -->
</section>

<style>
	p {
		@apply text-sm;
	}
</style>
