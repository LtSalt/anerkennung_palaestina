<script>
	import { Tween } from 'svelte/motion';
	import { Plot, Dot, Frame, GridX, GridY, Link, AreaY, AreaX, Area, Line } from 'svelteplot';
	import { page } from '$app/state';
	import { draw } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	let { states, counter } = $derived(page.data);

	const nMax = 192;
	const year = new Tween(2011, { duration: 800, easing: cubicOut });
	let year2 = $state(2011);

	let tracker = $derived(counter.filter((d) => d.date <= year.current));
	let nPro = $derived(tracker.at(-1)['sum']);
	let clipPath = $derived([
		{ x: 192, y: 1988 },
		{ x: 192, y: year.current }
	]);
</script>

<button onclick={() => (year.target = 1988)}>1988</button>
<button onclick={() => (year.target = 2000)}>2000</button>
<button onclick={() => (year.target = 2011)}>2011</button>
<button onclick={() => (year.target = 2025)}>2025</button>

<Plot
	x={{ domain: [0, 192], label: false, axis: false }}
	y={{ domain: [1988, 2025], reverse: true, label: false, axis: false }}
	marginTop={40}
>
	<clipPath id="clipPath">
		<AreaX data={clipPath} x="x" y="y"></AreaX>
	</clipPath>
	<g clip-path="url(#clipPath)">
		<Line data={counter} x="sum" y="date" />
		<AreaX data={counter} x="sum" y="date" fill="blue" opacity="0.2" />
		<Area data={counter} y1="date" x1="sum" x2={nMax} fill="red" opacity="0.2" />

		<Line
			data={[
				[0, year.current],
				[nPro, year.current]
			]}
			stroke="blue"
		></Line>
		<Line
			data={[
				[nPro, year.current],
				[nMax, year.current]
			]}
			stroke="red"
		></Line>
	</g>
</Plot>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		background-color: theme(--color-gray-100);
	}
</style>
