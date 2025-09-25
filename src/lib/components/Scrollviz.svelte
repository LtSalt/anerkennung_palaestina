<script>
	import { Tween } from 'svelte/motion';
	import { linear } from 'svelte/easing';
	import { page } from '$app/state';
	import { Plot, Line, AreaY, Frame, GridX, GridY } from 'svelteplot';

	let { index } = $props();

	const { counter } = page.data;
	const targets = [1988, 2000, 2011, 2025];
	const nMax = 192;

	const year = new Tween(1988, {
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

	let height = $state(0);

	$effect(() => {
		year.target = targets[index];
	});
</script>

<div class="wrapper-inner" bind:clientHeight={height}>
	<Plot
		height={height * 0.8}
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
</div>

<style lang="postcss">
	:global(.tick > line) {
		display: none;
	}

	.wrapper-inner {
		height: 100vh;
		diplay: grid;
		place-content: center;
	}
</style>
