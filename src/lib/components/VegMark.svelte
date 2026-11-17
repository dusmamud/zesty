<script lang="ts">
	interface Props {
		veg: boolean;
		label?: boolean;
	}

	let { veg, label = true }: Props = $props();
</script>

<span
	class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[11px] leading-none font-bold shadow-sm {veg
		? 'text-green-700'
		: 'text-red-700'}"
	title={veg ? 'Vegetarian' : 'Non-vegetarian'}
>
	<span
		class="flex h-4 w-4 items-center justify-center border-2 bg-white {veg
			? 'border-green-600'
			: 'border-red-600'}"
	>
		<span class="h-2 w-2 rounded-full {veg ? 'bg-green-600' : 'bg-red-600'}"></span>
	</span>
	{#if label}
		{veg ? 'Veg' : 'Non-veg'}
	{/if}
</span>
