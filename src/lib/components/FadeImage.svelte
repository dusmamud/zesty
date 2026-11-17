<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		class?: string;
		loading?: 'lazy' | 'eager';
	}

	let { src, alt, class: cls = '', loading = 'lazy' }: Props = $props();

	let loaded = $state(false);
	let img: HTMLImageElement | undefined = $state();

	// Cached images may already be complete before onload fires.
	$effect(() => {
		if (img?.complete && img.naturalWidth > 0) loaded = true;
	});
</script>

<img
	bind:this={img}
	{src}
	{alt}
	{loading}
	onload={() => (loaded = true)}
	class="img-fade {loaded ? 'img-loaded' : ''} {cls}"
/>
