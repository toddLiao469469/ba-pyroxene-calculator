<script lang="ts">
	import Typography from '$lib/components/Typography.svelte';
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
		所做的網頁版青輝石計算機
	</Typography>

	<Typography>
		<a
			href="https://docs.google.com/spreadsheets/d/1HxwR8CqAw7UMm8M2c74EEXU7RqhnIIIeEZi8XK8aMRU/edit#gid=2117524808"
			target="_blank"
			class="text-cyan-500">原 excel 版本青輝石計算器</a
		>
	</Typography>
	<Typography variant="h2" class="mt-4">專案資訊</Typography>
	<Typography variant="h3" class="mt-4">特別感謝</Typography>
	<Typography variant="h3" class="mt-4">問題回報與功能討論</Typography>
	<Typography variant="h3" class="mt-4">更新紀錄</Typography>
	<Typography variant="h3" class="mt-4">Roadmap</Typography>
	<Typography variant="h3" class="mt-4">Contributors</Typography>
	
</section>

<style>
</style>
