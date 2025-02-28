<template>
	<span id="callout-card">
		<div :class="resolveClass('callout-card__container')">
			<div
				v-if="image"
				class="image__container"
			>
				<img
					:class="resolveClass('image__content')"
					:src="image"
					:alt="imageDescription"
				/>
			</div>
			<div :class="resolveClass('content__container')">
				<div :class="resolveClass('content')">
					<span class="content__title">
						{{ title }}
					</span>

					<!-- @slot Slot usado para inserção de conteúdo customizado no texto. -->
					<span class="content__text">
						<div
							v-if="hasTextSlot"
						>
							<!-- @slot Slot para renderização customizada do texto. Sobrescreve a prop `text`.
							-->
							<slot name="text" />
						</div>

						<div v-else>
							{{ text }}
						</div>
					</span>
				</div>
				<div>
					<!-- @slot Slot usado para inserção de conteúdo customizado no lugar do botão de ação. -->
					<slot name="action">
						<!--
							Evento que indica que o Botão foi clicado
							@event action-button-click
							@type {Event}
						-->
						<cds-button
							id="content-button"
							:variant="actionButtonVariant"
							:text="actionButtonText"
							:secondary="actionButtonSecondary"
							:disabled="actionButtonDisabled"
							@click="$emit('action-button-click')"
						/>
					</slot>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * O título do card. O título também pode ser usado com o slot.
		 */
		title: {
			type: String,
			default: 'Título do AlertCard',
			required: true,
		},
		/**
		 * O texto do card. O texto também pode ser usado com o slot.
		 */
		text: {
			type: String,
			default: 'Subtítulo do AlertCard',
			required: false,
		},
		/**
		 * A imagem do card.
		 */
		image: {
			type: String,
			default: '',
			required: false,
		},
		/**
		 * A descrição da imagem do card.
		 */
		imageDescription: {
			type: String,
			default: 'Imagem de CalloutCard',
		},
		/**
		 * A cor do botão do card.
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
		},
		/**
		 * O texto do botão do card.
		 */
		actionButtonText: {
			type: String,
			default: 'Ok',
		},
		/**
		 * A versão secundária do botão.
		 */
		actionButtonSecondary: {
			type: Boolean,
			default: false,
		},
		/**
		 * A versão disabled do botão.
		 */
		actionButtonDisabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Modo de exibição do card.
		 */
		compact: {
			type: Boolean,
			default: false,
		},
	},

	computed :{
		hasTextSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'text');
		}
	},

	methods: {
		resolveClass(element) {
			return this.compact ? `${element}--compact` : element;
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

#callout-card .callout-card {
	display: flex;
	align-items: center;
	padding: pa(7);
	border-radius: 16px;
	border: 1px solid $n-40;

	&__container {
		@extend .callout-card;
		width: 700px;

		&--compact {
			@extend .callout-card;
			padding: pYX(2,6);
		}
	}

	&__content-container {
		width: 20%;
	}
}

#callout-card .image {
	&__container {
		margin: mr(7);
	}

	&__content {
		max-width: 200px;
		max-height: 200px;

		&--compact {
			max-width: 120px;
			max-height: 90px;
		}
	}
}

#callout-card .content {
	margin: mb(4);

	&--compact {
		max-width: 529px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	&__title {
		@include body-2;
		font-weight: $font-weight-semibold;
		display: block;
		color: $n-700;
	}

	&__text {
		@include subheading-3;
		display: block;
		color: $n-600;
	}

	&__container {
		&--compact {
			display: flex;
			justify-content: space-between;
			width: 100%;
			align-items: center;
		}
	}
}
</style>
