<script>
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { Plot, Dot, Frame, GridX, GridY, Link, AreaY, AreaX, Area, Line } from 'svelteplot';
	import { page } from '$app/state';

	let { states, counter } = $derived(page.data);

	const nMax = 192;
	const year = new Tween(1988, { duration: 800, easing: cubicOut });

	let tracker = $derived(counter.filter((d) => d.date <= year.current));
	let nPro = $derived(tracker.at(-1)['sum']);
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
	<AreaX data={tracker} x="sum" y="date" fill="blue" opacity="0.2" />
	<Area data={tracker} y1="date" x1="sum" x2={nMax} fill="red" opacity="0.2" />
	<Line data={tracker} x="sum" y="date" color="blue" />
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
</Plot>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		background-color: theme(--color-gray-100);
	}

	:global(rect, line, .tick) {
		transition: all 0.5s ease-in-out;
		opacity: 1;
		animation-name: fadeInOpacity;
		animation-timing-function: ease-in;
		animation-duration: 0.5s;
	}
</style>
