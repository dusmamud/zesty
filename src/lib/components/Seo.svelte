<script lang="ts">
	/**
	 * Canonical + Open Graph + Twitter tags for one page.
	 * Use inside <svelte:head>. `path` is the page path (e.g. '/menu', '/dish/veggie-supreme-pizza').
	 * `image` is a site-relative path (default '/og.jpg') or an absolute URL.
	 */
	interface Props {
		title: string;
		description: string;
		path: string;
		image?: string;
		ogDescription?: string;
	}

	let { title, description, path, image = '/og.jpg', ogDescription }: Props = $props();

	const SITE = 'https://zeesty.pages.dev';
	const url = $derived(`${SITE}${path}`);
	const img = $derived(image.startsWith('http') ? image : `${SITE}${image}`);
	const ogDesc = $derived(ogDescription ?? description);
</script>

<link rel="canonical" href={url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={ogDesc} />
<meta property="og:url" content={url} />
<meta property="og:image" content={img} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={ogDesc} />
<meta name="twitter:image" content={img} />
