<template>
	<span
		id="scrollable"
	>
		<div
			class="scrollable__container"
			:style="{
				'max-height': maxHeight,
				'height': autoHeight ? 'auto' : maxHeight,
			}"
		>
			<!-- @slot Slot com o conteúdo que você deseja que seja scrollable -->
			<slot></slot>
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * Altura máxima do container até ser scrollado
		 */
		maxHeight: {
			type: String,
			default: '300px',
			required: true,
		},
		/**
		 * Define altura como 'auto' para o container até o limite máximo
		 */
		autoHeight: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

#scrollable .scrollable {
	&__container {
		overflow-y: auto;
		overflow-x: hidden;

		/* width */
		&::-webkit-scrollbar {
			width: 6px;
			border-radius: 8px;
		}

		/* Track */
		&::-webkit-scrollbar-track {
			background: transparent;
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: $n-40;
			border-radius: 8px;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: $n-50;
		}
	}

}
</style>
