<script>
	let width = $state(0);
	const padding = 12;
</script>

<div bind:clientWidth={width} class="place-items-centerpy-4 my-4 grid">
	<iframe
		title="[ Insert title here ]"
		aria-label="Liniendiagramm"
		id="datawrapper-chart-tG039"
		src="https://datawrapper.dwcdn.net/tG039/1/"
		scrolling="no"
		frameborder="0"
		style="border: none;"
		width={width - padding}
		height="500"
		data-external="1"
	></iframe>
</div>
