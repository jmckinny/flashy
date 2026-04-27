<script lang="ts">
	import { deckToCSV } from '$lib/deck';
	import { XIcon, Download } from '@lucide/svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	let { deckName } = $props();
	let open = $state(false);

	function exportDeck() {
		const csv = deckToCSV(deckName);
		const blob = new Blob([csv], { type: 'application/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${deckName}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<Dialog {open} onOpenChange={(details) => (open = details.open)}>
	<Dialog.Trigger class="btn preset-tonal-primary">
		<Download />
	</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content class="w-full max-w-xl space-y-4 card bg-surface-100-900 p-4 shadow-xl ">
				<header class="flex items-center justify-between">
					<Dialog.Title class="text-lg font-bold">Export Deck</Dialog.Title>
					<Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
						<XIcon class="size-4" />
					</Dialog.CloseTrigger>
				</header>
				<Dialog.Description>
					<p>
						Are you sure you want to export deck "{deckName}"? <br />
					</p>
				</Dialog.Description>
				<footer class="flex justify-end gap-2">
					<Dialog.CloseTrigger class="btn preset-tonal">Cancel</Dialog.CloseTrigger>
					<button type="button" class="btn preset-filled preset-tonal-primary" onclick={exportDeck}>
						Export
					</button>
				</footer>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
