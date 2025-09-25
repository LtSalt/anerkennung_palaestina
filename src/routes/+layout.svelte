<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="flex justify-between border-b p-2">
	<div class=""><a href="/">Home</a></div>
	<ul class="flex gap-2 pr-2">
		<li class=""><a href="/areaY">AreaY</a></li>
		<li class=""><a href="/areaX">AreaX</a></li>
		<li class=""><a href="/areaXTween">AreaXTween</a></li>
		<li class=""><a href="/continents">Continents</a></li>
	</ul>
</nav>

{@render children?.()}
