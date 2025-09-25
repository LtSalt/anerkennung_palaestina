<script>
	import { page } from '$app/state';
	import { Plot, Line } from 'svelteplot';

	const { byContinent } = page.data;

	let width = $state();
	const padding = 16;
</script>

<div class="grid place-items-center py-4" bind:clientWidth={width}>
	<iframe
		title="[ Insert title here ]"
		aria-label="Liniendiagramm"
		id="datawrapper-chart-tG039"
		src="https://datawrapper.dwcdn.net/tG039/1/"
		scrolling="no"
		frameborder="0"
		style="border: none;"
		width={width - padding}
		height="385"
		data-external="1"
	></iframe>
</div>

<iframe
	title="[ Insert title here ]"
	aria-label="Choroplethen-Karte"
	id="datawrapper-chart-eULdG"
	src="https://datawrapper.dwcdn.net/eULdG/1/"
	scrolling="no"
	frameborder="0"
	style="border: none;"
	width="360"
	height="156"
	data-external="1"
></iframe>
