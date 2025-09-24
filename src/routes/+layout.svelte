<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ul>
	<li><a href="/">Home</a></li>
	<li><a href="/areaY">AreaY</a></li>
</ul>

{@render children?.()}
