<script lang="ts">
	import { addNewDeck } from '$lib/deck';
	import { invalidate } from '$app/navigation';
	import { XIcon } from '@lucide/svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	let deckName = $state('');
	let open = $state(false);

	function createNewDeck() {
		if (deckName) {
			addNewDeck(deckName, []);
			open = false;
			invalidate('app:decks');
		}
	}
</script>

<Dialog {open} onOpenChange={(details) => (open = details.open)}>
	<Dialog.Trigger class="btn preset-tonal-success">Create Deck</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content class="w-full max-w-xl space-y-4 card bg-surface-100-900 p-4 shadow-xl ">
				<header class="flex items-center justify-between">
					<Dialog.Title class="text-lg font-bold">Create New Deck</Dialog.Title>
					<Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
						<XIcon class="size-4" />
					</Dialog.CloseTrigger>
				</header>
				<Dialog.Description>
					<input type="text" class="input" placeholder="Deck Name" bind:value={deckName} />
				</Dialog.Description>
				<footer class="flex justify-end gap-2">
					<Dialog.CloseTrigger class="btn preset-tonal">Cancel</Dialog.CloseTrigger>
					<button type="button" class="btn preset-filled" onclick={createNewDeck}>Create</button>
				</footer>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
