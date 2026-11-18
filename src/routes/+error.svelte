<script module>
	// Prerender the error page so adapter-static writes it as 404.html,
	// which Cloudflare Pages serves for unknown paths.
	export const prerender = true;
</script>

<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/Seo.svelte';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} — Zesty</title>
	<Seo
		title={page.status === 404 ? 'Page not found — Zesty' : 'Something went wrong — Zesty'}
		description="That page is not on the menu. Head back home or browse the full Zesty menu."
		path="/"
	/>
</svelte:head>

<div class="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
	<p class="font-display text-7xl font-extrabold text-brand">{page.status}</p>
	<h1 class="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
		{page.status === 404 ? 'This page is not on the menu' : 'Something went wrong'}
	</h1>
	<p class="mx-auto mt-3 max-w-md text-muted">
		{page.status === 404
			? 'The link may be old, or the dish may have sold out. Try the menu — something tasty is waiting.'
			: (page.error?.message ?? 'Please try again, or head back to the menu.')}
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a
			href="/"
			class="rounded-full bg-brand px-7 py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
		>
			Back Home
		</a>
		<a
			href="/menu"
			class="rounded-full bg-white px-7 py-3.5 font-bold shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
		>
			Browse the Menu
		</a>
	</div>
</div>
