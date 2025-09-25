<script>
	let width = $state(0);
	const padding = 12;
</script>

<div bind:clientWidth={width} class="my-4 grid place-items-center py-4">
	<iframe
		title="[ Insert title here ]"
		aria-label="Choroplethen-Karte"
		id="datawrapper-chart-eULdG"
		src="https://datawrapper.dwcdn.net/eULdG/1/"
		scrolling="no"
		frameborder="0"
		style="border: none;"
		width={width - padding}
		height="350"
		data-external="1"
	></iframe>
</div>
