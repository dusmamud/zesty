<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
</script>

<svelte:head>
	<title>Accessibility — Zesty</title>
	<meta
		name="description"
		content="Zesty's accessibility commitment: how we build for keyboard, screen reader and reduced-motion users, and how to report an issue."
	/>
	<Seo
		title="Accessibility — Zesty"
		description="Zesty's accessibility commitment: how we build for keyboard, screen reader and reduced-motion users, and how to report an issue."
		path="/accessibility"
	/>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Our Commitment</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Accessibility at Zesty</h1>
		<p class="mt-2 text-muted">Everyone should be able to order food easily — whatever device, keyboard or screen reader they use.</p>
	</div>

	<div class="mt-8 space-y-6">
		<section class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h2 class="font-display text-xl font-bold">What we aim for</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				We build Zesty to meet the Web Content Accessibility Guidelines (WCAG) 2.2, level AA — the widely used
				standard for accessible websites. That means, among other things:
			</p>
			<ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
				<li>Every page works with a keyboard alone — no mouse needed, no keyboard traps.</li>
				<li>Dialogs and drawers (cart, checkout) close with the Escape key and return focus to where you were.</li>
				<li>Images that matter have text descriptions; decorative images are hidden from screen readers.</li>
				<li>Every form field has a visible label, and errors are announced, not just coloured red.</li>
				<li>Tap targets are at least 24×24 pixels, and text stays readable when zoomed to 200%.</li>
				<li>If you prefer reduced motion, animations, marquees and scroll effects switch off automatically.</li>
			</ul>
		</section>

		<section class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h2 class="font-display text-xl font-bold">What we are still improving</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Accessibility is ongoing work, not a one-time fix. We regularly re-check the core flow — search, menu,
				cart, checkout and order tracking — with a keyboard and a screen reader, and we fix what we find.
				If something on this site is hard for you to use, that is a bug, and we want to know about it.
			</p>
		</section>

		<section class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h2 class="font-display text-xl font-bold">Report an accessibility issue</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Tell us the page, what you were trying to do, and what device or assistive technology you use.
				We reply within one working day.
			</p>
			<div class="mt-4 flex flex-wrap gap-3">
				<a href="/contact" class="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark">Contact us →</a>
				<a href="/help" class="rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:text-brand">Help Centre →</a>
			</div>
		</section>
	</div>
</div>
