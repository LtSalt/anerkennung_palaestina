<script>
	import { Plot, Dot, Frame } from 'svelteplot';
	import { page } from '$app/state';

	let { cars } = $derived(page.data);

	$inspect(cars);
</script>

<Plot
	grid
	height={500}
	x={{ domain: [0, 100] }}
	y={{ domain: [0, 100] }}
	inset={20}
	marginRight={40}
	marginLeft={40}
>
	<!-- margin={{ top: 40, right: 100, bottom: 40, left: 40 }}
	padding={{ top: 40, right: 100, bottom: 40, left: 40 }} -->
	<Frame></Frame>
	<Dot
		data={[
			{ x: 13, y: 10 },
			{ x: 34, y: 23 }
		]}
		x="x"
		y="y"
		fill="black"
		r="10"
		opacity="0.6"
		stroke="red"
		strokeWidth="4"
	></Dot>
</Plot>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		background-color: theme(--color-gray-100);
	}
</style>
