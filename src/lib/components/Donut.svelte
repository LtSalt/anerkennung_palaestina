<script>
	let width = $state(0);
	const padding = 12;
</script>

<div bind:clientWidth={width} class="place-items-centerpy-4 my-4 grid">
	<iframe
		title="Die EU ist gespalten"
		aria-label="Donut-diagramm"
		id="datawrapper-chart-nIFO1"
		src="https://datawrapper.dwcdn.net/nIFO1/1/"
		scrolling="no"
		frameborder="0"
		style="border: none;"
		width={width - padding}
		height="600"
		data-external="1"
	></iframe>
</div>
