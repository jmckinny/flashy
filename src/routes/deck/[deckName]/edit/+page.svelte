<script lang="ts">
	import { Save, CirclePlus, Trash } from '@lucide/svelte';
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';
	import type { PageProps } from './$types';
	import { updateDeck } from '$lib/deck';
	let { data }: PageProps = $props();
	let cards = $state<{ question: string; answer: string }[]>([]);
	$effect(() => {
		cards = data.cards;
	});
	let deckName = $derived(data.deckName);
	const toaster = createToaster();

	function saveDeck() {
		try {
			updateDeck(deckName, cards);
		} catch (e) {
			console.error(e);
			toaster.error({
				title: 'Error',
				description: 'Failed to update deck'
			});
			return;
		}
		toaster.success({
			title: 'Success',
			description: 'Updated Deck'
		});
	}

	function addCard() {
		cards.push({
			question: '',
			answer: ''
		});
		cards = cards;
	}

	function deleteCard(removeIndex: number) {
		cards = cards.filter((_, i) => i !== removeIndex);
	}
</script>

<div>
	<h2 class="h2">Edit - {deckName}</h2>
	<table class="table">
		<thead>
			<tr>
				<th class="h3">Front</th>
				<th class="h3">Back</th>
			</tr>
		</thead>
		<tbody>
			{#each cards as card, index}
				<tr>
					<td>
						<input class="input" type="text" bind:value={card.question} />
					</td>
					<td>
						<input class="input" type="text" bind:value={card.answer} />
					</td>
					<td>
						<button
							type="button"
							class="btn-icon btn preset-tonal-error"
							onclick={() => deleteCard(index)}
						>
							<Trash />
						</button>
					</td>
				</tr>
			{/each}
			<tr>
				<td>
					<button type="button" class="btn-icon preset-filled btn-lg" onclick={addCard}>
						<CirclePlus />
					</button>
				</td>
			</tr>
		</tbody>
	</table>
	<hr class="hr" />
	<button type="button" class="my-4 btn-icon preset-filled-success-500 btn-lg" onclick={saveDeck}>
		<Save />
	</button>
</div>
<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
