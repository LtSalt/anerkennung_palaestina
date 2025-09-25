<script>
	import { Tween } from 'svelte/motion';
	import { Plot, Dot, Frame, GridX, GridY, Link, AreaY, AreaX, Area, Line } from 'svelteplot';
	import { page } from '$app/state';
	import { draw } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	let { states, counter } = $derived(page.data);

	const nMax = 192;
	const year = new Tween(2011, {
		duration: 800,
		easing: cubicOut,
		interpolate: (from, to) => (t) => Math.round(from + (to - from) * t)
	});
	const targets = [1988, 2000, 2011, 2025];

	let tracker = $derived(counter.filter((d) => d.date <= year.current));
	let nPro = $derived(tracker.at(-1)['sum']);

	let clipPath = $derived([
		{ x: 192, y: 1988 },
		{ x: 192, y: year.current + 0.2 }
	]);

	let rangePro = $derived([
		[0, year.current],
		[nPro, year.current]
	]);

	let rangeCon = $derived([
		[nPro, year.current],
		[nMax, year.current]
	]);
</script>

<h1 class="my-4 text-xl">Area Y Chart with Clip-Path & Tween</h1>

<div class="flex gap-4">
	<input type="range" min="1988" max="2025" bind:value={year.target} step="1" />

	<div class="flex gap-1">
		{#each targets as target}
			<button onclick={() => (year.target = target)}>{target}</button>
		{/each}
	</div>
</div>

<Plot
	x={{ domain: [0, 192], label: false, axis: false }}
	y={{ domain: [1988, 2025], reverse: true, label: false, axis: false }}
	marginTop={40}
>
	<clipPath id="clipPath">
		<AreaX data={clipPath} x="x" y="y"></AreaX>
	</clipPath>
	<g clip-path="url(#clipPath)">
		<Line data={counter} x="sum" y="date" style="transition: opacity 0.2s ease-in" />
		<AreaX data={counter} x="sum" y="date" fill="blue" opacity="0.2" />
		<Area data={counter} y1="date" x1="sum" x2={nMax} fill="red" opacity="0.2" />
		<Line data={rangePro} stroke="blue" strokeWidth="4"></Line>
		<Line data={rangeCon} stroke="red" strokeWidth="4"></Line>
	</g>
</Plot>
