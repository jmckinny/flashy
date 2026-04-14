<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	import { Pencil } from '@lucide/svelte';
	import NewDeck from '../components/newDeck.svelte';
	import ImportDeck from '../components/importDeck.svelte';
	import DeleteDeck from '../components/deleteDeck.svelte';
	let { data }: PageProps = $props();
	let decks = $derived(data.decks);
</script>

<div>
	<h2 class="h2">Load Flashcard Deck</h2>

	<section>
		<ul>
			{#each decks as deck}
				<li class="py-2">
					<div class="flex items-center gap-2">
						<button
							type="button"
							class="btn preset-filled"
							onclick={() => goto(`deck/${deck.name}/`)}
						>
							{deck.name} - {deck.cardCount} cards
						</button>
						<button
							class="btn preset-filled"
							type="button"
							onclick={() => goto(`deck/${deck.name}/edit`)}
						>
							<Pencil />
						</button>
						<DeleteDeck deckName={deck.name} />
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<NewDeck />

	<h2 class="h2">Import Flashcard Deck</h2>

	<ImportDeck bind:decks />
</div>
