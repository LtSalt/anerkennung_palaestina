<script>
	import { Plot, BarX } from 'svelteplot';
</script>

<Plot grid>
	<BarX data={[1, 2, 3, 4]} />
</Plot>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p class="bg-"></p>

<h1 class="text-3xl font-bold underline">Hello world!</h1>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		background-color: theme(--color-gray-100);
	}
</style>
