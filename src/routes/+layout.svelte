<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="grid grid-rows-[auto_1fr_auto]">
	<header>
		<span class="flex items-center justify-between p-4">
			<h1 class="h1">
				<a href={resolve('/')}> Flashy </a>
			</h1>
			<h2 class="h2">v{__APP_VERSION__}</h2>
		</span>
		<hr class="hr" />
	</header>
	<main class="p-4">
		{@render children()}
	</main>
</div>
