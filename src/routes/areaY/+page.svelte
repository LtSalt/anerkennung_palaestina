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
	let year2 = $state(1990);

	let tracker = $derived(counter.filter((d) => d.date <= year2));
	let nPro = $derived(tracker.at(-1)['sum']);
	let clipPath = $derived([
		{ x: 192, y: 1988 },
		{ x: 192, y: year.current }
	]);

	function addYear() {
		year2++;
		console.log('hey');
	}

	let interval = $state();

	function interpolateValues() {
		interval = setInterval(addYear, 100);

		// for (let i = year2; i < 2020; i++) {
		// 	setTimeout(addYear, 1000);
		// }
	}

	$effect(() => {
		if (year2 == 2011) clearInterval(interval);
	});

	$inspect(year2);
</script>

<input type="range" min="1988" max="2025" bind:value={year2} step="1" />
<button onclick={interpolateValues}>Interpolate</button>

<button onclick={() => (year2 = 1988)}>1988</button>
<button onclick={() => (year2 = 2000)}>2000</button>
<button onclick={() => (year2 = 2011)}>2011</button>
<button onclick={() => (year2 = 2025)}>2025</button>

<Plot
	x={{ domain: [0, 192], label: false, axis: false }}
	y={{ domain: [1988, 2025], reverse: true, label: false, axis: false }}
	marginTop={40}
>
	<clipPath id="clipPath">
		<AreaX data={clipPath} x="x" y="y"></AreaX>
	</clipPath>
	<!-- <g clip-path="url(#clipPath)"> -->
	<g>
		<!-- <Line data={counter} x="sum" y="date" /> -->
		<Line data={tracker} x="sum" y="date" style="transition: opacity 0.2s ease-in" />
		<AreaX data={tracker} x="sum" y="date" fill="blue" opacity="0.2" />
		<Area data={tracker} y1="date" x1="sum" x2={nMax} fill="red" opacity="0.2" />

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
