<script>
	import { Tween } from 'svelte/motion';
	import { linear } from 'svelte/easing';
	import { page } from '$app/state';
	import { Plot, Line, AreaY, Frame, GridX, GridY } from 'svelteplot';

	const { counter } = page.data;
	const targets = [1988, 2000, 2011, 2025];
	const nMax = 192;

	const year = new Tween(2000, {
		duration: 500,
		easing: linear,
		interpolate: (from, to) => (t) => Math.round(from + (to - from) * t)
	});

	let tracker = $derived(counter.filter((d) => d.date <= year.current));
	let nPro = $derived(tracker.at(-1)['sum']);
	let domainYMax = $derived(year.target === 1988 ? 0 : nMax);

	let rangePro = $derived([
		[year.current, 0],
		[year.current, nMax]
	]);

	let rangeCon = $derived([
		[year.current, nPro],
		[year.current, nMax]
	]);

	function handleClick(target) {
		year.target = target;
	}

	$inspect(year.target);
</script>

<div class="flex gap-4">
	<input type="range" min="1988" max="2025" bind:value={year.target} step="1" />
	<div class="flex gap-1">
		{#each targets as target}
			<button onclick={() => handleClick(target)} class="cursor-pointer">{target}</button>
		{/each}
	</div>
</div>

<Plot
	x={{ domain: [1988, 2025], label: false, tickFormat: { useGrouping: false } }}
	y={{ domain: [0, 192], label: false }}
	marginTop={40}
	marginLeft={40}
	marginRight={40}
	locale="de-DE"
>
	<AreaY data={tracker} x="date" y="sum" fill="#FFE498"></AreaY>
	<GridX></GridX>
	<GridY></GridY>
	<Line data={rangePro} stroke="grey" strokeDasharray="4 2" strokeWidth="1" markerEnd="tick-x"
	></Line>
	<Line data={tracker} x="date" y="sum" markerEnd="circle" stroke="#FB0" strokeWidth="2"></Line>
</Plot>

<style lang="postcss">
	:global(.tick > line) {
		display: none;
	}
</style>
