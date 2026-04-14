<script lang="ts">
	import { ArrowLeft, ArrowRight, Shuffle } from '@lucide/svelte';
	import FlashCard from '../components/flashCard.svelte';

	let { cards } = $props();

	let index = $state(0);
	let totalCards = $derived(cards.length);
	let flipped = $state(false);

	let activeCard = $derived(cards[index]);

	async function nextCard() {
		flipped = false;
		index += 1;
		index = (index + cards.length) % cards.length;
	}
	async function prevCard() {
		flipped = false;
		index -= 1;
		index = (index + cards.length) % cards.length;
	}

	// Fisher–Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
	function shuffle(array: any[]) {
		const a = [...array];
		let currentIndex = a.length;
		while (currentIndex != 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[a[currentIndex], a[randomIndex]] = [a[randomIndex], a[currentIndex]];
		}
		return a;
	}

	function onShuffleButton() {
		flipped = false;
		cards = shuffle(cards);
		index = index - index; // force re-render
	}

	function onKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowRight':
				nextCard();
				break;
			case 'ArrowLeft':
				prevCard();
				break;
			case 'Space':
				flipped = !flipped;
				break;
			case 'KeyS':
				onShuffleButton();
				break;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />
{#if cards.length === 0}
	<h2 class="h2">Empty Deck</h2>
{:else}
	<div class="flex justify-center p-4">
		<div class="flex w-full max-w-5xl flex-col items-center">
			{#key index}
				<FlashCard question={activeCard.question} answer={activeCard.answer} bind:flipped />
			{/key}

			<div class="flex w-full max-w-5xl items-center py-5">
				<!-- Left -->
				<div class="flex flex-1 justify-start">
					<button onclick={onShuffleButton} type="button" class="btn preset-filled">
						<Shuffle />
					</button>
				</div>

				<!-- Center -->
				<div class="flex items-center gap-5">
					<button onclick={prevCard} type="button" class="btn preset-filled">
						<ArrowLeft />
					</button>

					<h4 class="h4">
						{index + 1}/{totalCards}
					</h4>

					<button onclick={nextCard} type="button" class="btn preset-filled">
						<ArrowRight />
					</button>
				</div>

				<!-- Right spacer (keeps center truly centered) -->
				<div class="flex-1"></div>
			</div>

			<hr class="hr" />
		</div>
	</div>
{/if}
