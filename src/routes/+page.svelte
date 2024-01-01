<script lang="ts">
	import { Github } from 'lucide-svelte';

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
	<Typography variant="h2" class="my-4">專案資訊</Typography>

	<p>
		特別感謝原版作者<span class="text-teal-500">村長</span>、<span class="text-teal-500">夜貓</span>、<span class="text-teal-500">貓貓豪可愛</span>
	</p>
	<Typography variant="h3" class="mt-4">專案說明</Typography>
	<p>
		這是一個使用參考巴哈貼文，所做的網頁版青輝石計算機，目前還在開發中，暫時以原版的<span
			class="text-pink-300">小春及吹雪版</span
		>進行開發，歡迎各位提供意見與建議。
	</p>
	<p>
		這個小專案也是我第一次使用 svelte 進行開發，所以有些地方可能會有不太好的地方，歡迎各位開 PR
		來幫助我改善這個專案。
	</p>
	<Typography variant="h4" class="mt-4">問題回報與功能討論</Typography>
	<p>
		如果是有關 Bug 回報或者功能可以的話請至 <a
			href="https://github.com/toddLiao469469/ba-pyroxene-calculator/issues"
		>
			<Github class="inline" />
			<span class="text-cyan-500"> Github </span>
		</a> 開 Issue，這樣我才能夠更好的追蹤問題。
	</p>
	<p>
		如果是非開發者的朋友可以使用 DC 私訊我，我的 ID 是 <span class="text-cyan-500"
			>toddliao469469</span
		>
	</p>
	<Typography variant="h4" class="mt-4">TODO</Typography>

	<ul class="ml-6 list-disc [&>li]:mt-2">
		<li>更新活動資料至日服進度</li>
		<li>個別活動青輝石調整</li>
		<li>優香版計算器</li>
		<li>優化 UI</li>
		<li>優化更新活動資料的方法及資料結構</li>
	</ul>

	<Typography variant="h4" class="mt-4">Tech stack 及如何協作</Typography>
	<p>
		目前並沒有 coding style 的規範，只有基本的 linter rule <br />
		所以只要能夠跑起來的話沒問題的話就可以開 PR。
	</p>

	<p>目前比較主要用到的工具是：</p>
	<ul class="ml-6 list-disc [&>li]:mt-2">
		<li>Svelte + Svelte-kit</li>
		<li>tailwind css</li>
		<li>shadcn/svelte</li>
		<li>Lucide</li>
	</ul>
	<p>
		但除了 tailwind css
		以外，基本上我都沒有在工作上使用過所以可能會有一些奇怪的地方，歡迎各位提供意見與建議。
	</p>

	<Typography variant="h3" class="mt-4">更新紀錄</Typography>
	<p>🚧 wip 🚧</p>
	<Typography variant="h3" class="mt-4">Contributors</Typography>
	<p>🚧 wip 🚧</p>
</section>

<style scoped>
	p {
		@apply text-sm;
	}
</style>
