<script>
	import Scroller from '@sveltejs/svelte-scroller';
	import slides from '$lib/slides.json';
	import Scrollviz from '$lib/components/Scrollviz.svelte';
	import Text from '$lib/components/Text.svelte';
	import Lines from '$lib/components/Lines.svelte';
	import TextShort from '$lib/components/TextShort.svelte';
	import Choropleth from '$lib/components/Choropleth.svelte';
	import Donut from '$lib/components/Donut.svelte';
	import TextUltraShort from '$lib/components/TextUltraShort.svelte';

	let index = $state(0);
	let offset = $state(0);
	let progress = $state(0);
</script>

<div class="story-wrapper">
	<Scroller top={0} bottom={0} threshold={0.2} bind:index bind:offset bind:progress>
		<div slot="background">
			<Scrollviz {index} />
		</div>
		<div slot="foreground">
			{#each slides as slide}
				<section class="flex items-center justify-center p-4">
					<div class="slice-outer">
						<p>
							{slide}
						</p>
					</div>
				</section>
			{/each}
		</div>
	</Scroller>
	<div class="buffer"></div>
	<div class="attribution">
		<p>Von zehntausend Mitwirkenden</p>
	</div>
	<div class="content-wrapper grid gap-8 p-4">
		<Text />
		<Lines />
		<TextShort />
		<Choropleth />
		<Text />
		<Donut />
		<TextUltraShort></TextUltraShort>
	</div>
</div>

<style>
	.story-wrapper {
		margin-inline: auto;
		max-width: 800px;
		display: grid;
	}
	.content-wrapper {
		max-width: 70ch;
		margin-inline: auto;
	}

	section {
		height: 80vh;
	}

	.slice-outer {
		box-shadow:
			0 5px 16px #00000014,
			0 3px 8px #0000001a;
		backdrop-filter: blur(10px);
		border: 0.5px solid rgba(0, 0, 0, 0.05);
		background-clip: padding-box;
		background-color: rgba(255, 255, 255, 0.6);
		padding: 1rem;
		border-radius: 0.25rem;
		width: 40ch;
	}

	.buffer {
		height: 100vh;
	}

	.attribution {
		display: grid;
		place-items: center;
	}
</style>
