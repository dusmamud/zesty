<script lang="ts">
	import { CheckCircle2, Copy } from '@lucide/svelte';
	import type { Offer } from '#lib/data.ts';

	interface Props {
		offer: Offer;
		copied: boolean;
		onCopy: () => void;
		compact?: boolean;
	}

	let { offer, copied, onCopy, compact = false }: Props = $props();

	const ACCENT = {
		orange: { dot: 'bg-orange-500', text: 'text-orange-400' },
		green: { dot: 'bg-green-400', text: 'text-green-400' },
		amber: { dot: 'bg-amber-400', text: 'text-amber-400' }
	} as const;
</script>

<article class="flex h-full flex-col rounded-3xl bg-ink p-6 text-white shadow-sm">
	<span
		class="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase"
	>
		<span class="h-2 w-2 rounded-full {ACCENT[offer.accent].dot}"></span>
		<span class={ACCENT[offer.accent].text}>{offer.tag}</span>
	</span>
	<p class="mt-4 font-display text-3xl font-extrabold text-brand-light">{offer.code}</p>
	<p class="mt-1 font-display text-lg font-bold">{offer.title}</p>
	<p class="mt-1 flex-1 text-sm text-stone-300">{offer.text}</p>
	{#if !compact}
		<p class="mt-3 border-t border-white/15 pt-3 text-xs text-stone-400">{offer.terms}</p>
	{/if}
	<button
		type="button"
		onclick={onCopy}
		class="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition-transform duration-150 hover:bg-orange-100 active:scale-95"
	>
		{#if copied}
			<CheckCircle2 class="h-4 w-4 text-green-600" /> Copied!
		{:else}
			<Copy class="h-4 w-4" /> Copy Code
		{/if}
	</button>
</article>
