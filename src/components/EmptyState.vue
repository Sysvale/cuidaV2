<template>
	<div
		class="empty-state"
	>
		<!-- @slot Slot usado para inserção de conteúdo gráfico
			customizado como alternativa a imagem do empty-state. -->
		<slot name="graphic-element">
			<img
				class="empty-state__image"
				:src="image"
				:alt="imageDescription"
			/>
		</slot>
		<div class="empty-state__title">
			{{ title }}
		</div>

		<div class="empty-state__text">
			<!-- @slot Slot usado para inserção de conteúdo customizado no texto do corpo do
				empty state. -->
			<slot name="text">
				{{ text }}
			</slot>
		</div>

		<!--
			Evento emitido quando o botão do Empty State é clicado
			@event action-button-click
			@type {Event}
		-->
		<cds-button
			v-if="!hideActionButton"
			class="empty-state__button"
			:text="actionButtonText"
			:variant="actionButtonVariant"
			@click="$emit('action-button-click', true)"
		/>
	</div>
</template>

<script>
import CdsButton from './Button.vue';

const predefinedColors = [
	'teal',
	'green',
	'blue',
	'indigo',
	'violet',
	'pink',
	'red',
	'orange',
	'amber',
];

export default {
	components: {
		CdsButton,
	},

	props: {
		/**
		 * A imagem a ser mostrada no Empty State. Obs.: o addon Controls
		 * do Storybook ainda não permite a seleção de arquivos. Desse modo
		 * não é possível testar o funcionamento dessa prop por aqui.
		 */
		image: {
			type: String,
			default: '',
		},
		/**
		 * O descritor da imagem do Empty State adicionado à 'alt' da tag <img>
		 */
		imageDescription: {
			type: String,
			default: 'Imagem de Empty State',
		},
		/**
		 * O título do Empty State.
		 */
		title: {
			type: String,
			default: 'Título do empty state',
			required: true,
		},
		/**
		 * O texto instrutivo do Empty State
		 */
		text: {
			type: String,
			default: 'Para sair dessa situação de empty state, realize a ação abaixo.',
		},
		/**
		 * Prop utilizada para ocultar o botão de ação do Empty State.
		 */
		hideActionButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * O texto mostrado no botão de ação do Empty State
		 */
		actionButtonText: {
			type: String,
			default: 'Finalizar',
		},
		/**
		 * A variante do botão de ação do Empty State (segue as variantes do componente de botão do Cuida)
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
			validator: (value) => predefinedColors.includes(value),
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
    text-align: center;
	position: relative;
	margin: ma(12);

	&__image {
		max-width: 500px;
		max-height: 500px;
		width: auto;
		height: auto;
	}

	&__title {
		margin: mt(8);
		color: $n-600;
		@include subheading-1;
	}

	&__text {
		margin: mt(1);
		color: $n-500;
		max-width: 60%;
		@include subheading-3;
	}

	&__button {
		margin: mt(4);
	}
}
</style>
