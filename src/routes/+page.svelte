<script>
	import { Plot, Dot, Frame, GridX, GridY, Link, AreaY, AreaX, Area, Line } from 'svelteplot';
	import { page } from '$app/state';

	let { states, recognitionTime, aapl } = $derived(page.data);
</script>

<Plot y={{ domain: [0, 192] }}>
	<AreaY data={recognitionTime} x="date" y="sum" fill="blue" , opacity={0.2}></AreaY>
	<Line data={recognitionTime} x="date" y="sum"></Line>
	<Dot x={2025} y={152}></Dot>
</Plot>

<Plot grid y={{ reverse: true }} x={{ domain: [0, 192] }}>
	<AreaX data={recognitionTime} y="date" x="sum" />
</Plot>

<Plot>
	<AreaX data={recognitionTime} y="date" x="sum"></AreaX>
</Plot>

<Plot y={{ domain: [0, 192] }}>
	<AreaY data={recognitionTime} x="date" y="sum"></AreaY>
</Plot>

<Plot
	y={{ domain: [0, 192], label: false, axis: false, reverse: true }}
	x={{ domain: [1988, 2025], label: false }}
	height={800}
	marginTop={20}
	marginRight={20}
	marginBottom={40}
	marginLeft={20}
	color={{ scheme: 'rdbu' }}
>
	<Dot data={states} y="idx" x={2025} fill="recognizes" r={1}></Dot>
	<Link data={states} y1="idx" y2="idx" x1="date" x2={2025} stroke="recognizes" opacity={1}></Link>
</Plot>

<Plot
	x={{ domain: [0, 192], label: false }}
	y={{ domain: [1988, 2025], label: false, reverse: true }}
	marginTop={40}
	marginRight={20}
	marginBottom={40}
	marginLeft={50}
>
	<Dot data={states} x="idx" y={2025} fill="recognizes" r={1}></Dot>
	<Link data={states} x1="idx" x2="idx" y1="date" y2={2025} stroke="recognizes"></Link>
</Plot>

<Plot
	y={{ domain: [0, 192], reverse: true }}
	x={{ domain: [1988, 2025] }}
	marginTop={40}
	marginRight={40}
	marginBottom={40}
	marginLeft={40}
>
	<GridX strokeDasharray="1,3" strokeOpacity="0.5" />
	<Dot data={states} y="idx" x={2025} fill="recognizes" r={1}></Dot>
	<Link data={states} y1="idx" y2="idx" x1="date" x2={2025} stroke="recognizes" strokeWidth={0.5}
	></Link>
</Plot>

<!-- height={500} -->
<Plot
	x={{ domain: [0, 192], label: false }}
	y={{ domain: [1988, 2025], label: false, reverse: true }}
	marginTop={40}
	marginRight={20}
	marginBottom={40}
	marginLeft={50}
>
	<Dot data={states} x="idx" y={2025} fill="recognizes" r={1}></Dot>
	<Link data={states} x1="idx" x2="idx" y1="date" y2={2025} stroke="recognizes" strokeWidth={0.5} />
	<Link data={states} x1="idx" x2="idx" y1={1988} y2="date" stroke="grey"></Link>
</Plot>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		background-color: theme(--color-gray-100);
	}
</style>
