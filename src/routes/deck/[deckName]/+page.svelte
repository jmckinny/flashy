<script lang="ts">
	import type { PageProps } from './$types';
	import FlashcardDeck from '../../../components/flashcardDeck.svelte';
	let { data }: PageProps = $props();
	let cards = $derived(data.cards);
</script>

<FlashcardDeck {cards} />
