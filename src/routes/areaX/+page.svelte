<script>
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { page } from '$app/state';
	import { Plot, AreaY, Line, Dot, Area, AreaX } from 'svelteplot';
	import { onMount, tick } from 'svelte';

	let { counter } = page.data;

	const nMax = 192;
	const targets = [1988, 2000, 2011, 2025];
	let year = $state(2000);

	let tracker = $derived(counter.filter((d) => d.date <= year));
	let nPro = $derived(tracker.at(-1)['sum']);

	// let rangePro = $derived([
	// 	[year, 0],
	// 	[year, nPro]
	// ]);

	let rangePro = $derived([
		[year, 0],
		[year, nPro]
	]);

	let node = $state(null);
	let from = $state(0);
	let to = $state(0);

	onMount(() => {
		node = document.querySelector('.tracker > g > path');
		const from = node.getTotalLength();
		node.style.strokeDasharray = to;
		node.classList.add('draw');
	});

	async function draw(target) {
		from = node.getTotalLength();
		year = target;
		await tick();
		to = node.getTotalLength();

		node.style.strokeDasharray = to;
		node.animate(
			{
				strokeDashoffset: [to - from, 0]
			},
			{
				duration: 1000,
				easing: 'ease-out',
				fill: 'forwards'
			}
		);
	}
</script>

<div class="flex gap-4">
	<input type="range" min="1988" max="2025" bind:value={year} step="1" />
	<div class="flex gap-1">
		{#each targets as target}
			<button onclick={() => draw(target)}>{target}</button>
		{/each}
	</div>
</div>

<Plot
	x={{ domain: [1988, 2025], label: false }}
	y={{ domain: [0, 192], label: false }}
	marginTop={40}
	marginLeft={40}
	marginRight={40}
	grid={true}
>
	<AreaY data={tracker} x="date" y="sum" fill="blue" opacity="0.2"></AreaY>
	<Line data={tracker} x="date" y="sum" lineClass="tracker" style="--from: {from}; --to: {to};" />
	<Line data={rangePro} lineClass="dashed"></Line>
	<Dot data={[{ year, nPro }]} x="year" y="nPro" r={4} stroke="black" class="dot"></Dot>
</Plot>

<style>
	:global(.dashed) {
		stroke-dasharray: 2px 5px;
	}

	:global(.tracker > g > .draw) {
		stroke-dasharray: var(--to);
		animation: draw 2s ease-out forwards;
	}

	@keyframes -global-draw {
		from {
			stroke-dashoffset: var(--from);
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	:global(.dot) {
		/* offset-path: path('M 50 100 Q 200 50 350 100'); */
		/* animation: move 3s linear infinite; */
	}

	@keyframes move {
		to {
			/* offset-distance: 100%; */
		}
	}
</style>
