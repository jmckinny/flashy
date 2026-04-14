<script lang="ts">
	let { question, answer, flipped = $bindable(false) } = $props();

	function flipCard() {
		flipped = !flipped;
	}
</script>

<div
	role="button"
	tabindex="0"
	onclick={flipCard}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && flipCard()}
	class="w-full max-w-5xl perspective-distant"
>
	<div class="relative min-h-70 w-[100%] card transform-3d" class:flipped>
		<div class="face front">
			<p class="text-xl">{question}</p>
		</div>
		<div class="face back">
			<p class="text-xl">{answer}</p>
		</div>
	</div>
</div>

<style>
	.card {
		transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1);
	}

	.card.flipped {
		transform: rotateX(180deg);
	}

	.face {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem;
		backface-visibility: hidden;
		border: 1px solid;
		border-radius: 12px;
		background: inherit;

		/* key for text fitting */
		text-align: center;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.face p {
		font-size: clamp(1rem, 2.5vw, 1.5rem);
		line-height: 1.4;
		max-width: 100%;
	}

	.back {
		transform: rotateX(180deg);
	}
</style>
