<template>
	<div>
		<span>
			<span
				v-if="hasSlots"
			>
				<!--
					@slot Slot para renderização customizada da label
					(Obs: Também existe a prop label que pode ser usada
					quando não há necessidade de customização)
				-->
				<slot name="label" />
			</span>

			<label
				v-else
				class="textarea__label"
				for="cds-text-area"
			>
				<span>
					{{ label }}
				</span>
	
				<span
					v-if="required"
					class="textarea__label--required-indicator"
				>
					*
				</span>
	
			</label>
		</span>

		<div :class="stepperInputDynamicClass">
			<textarea
				id="textarea"
				class="textarea__input"
				v-model="internalValue"
				:placeholder="placeholder"
				:disabled="disabled"
			/>
			<div class="textarea__icon-container">
				<cds-icon
					v-if="validState && !disabled"
					name="check-outline"
					height="20"
					width="20"
					color="#239F78"
					class="textarea__icon--check-icon"
				/>
				<cds-icon
					v-if="errorState && !disabled"
					name="alert-outline"
					height="20"
					width="20"
					color="#D22D41"
					class="textarea__icon--alert-circle-icon"
				/>
				<cds-spinner
					v-if="loadingState && !disabled"
					size="sm"
					variant="blue"
					class="textarea__icon--spinner-icon"
				/>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="textarea__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';

export default {
	props: {
		/**
		* Prop utilizada como v-model.
		*/
		value: {
			type: String,
			default: '',
			required: true,
		},

		/**
		 * Especifica a label do textarea.
		 */
		label: {
			type: String,
			default: 'Label',
		},

		/**
		* Exibe asterisco que indica campo obrigatório (Obs: Não faz a validação)
		*/
		required: {
			type: Boolean,
			default: false,
		},

		/**
		 * Especifica o placeholder do textarea.
		 */
		placeholder: {
			type: String,
			default: 'Digite aqui a descrição',
		},

		/**
		 * Desabilita o input do textarea.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},

		/**
		 * Especifica o estado do textarea. As opções são 'default', 'valid', 'invalid' e 'loading'.
		 */
		state: {
			type: String,
			default: 'default',
		},

		/**
		 * Desabilita o input do textarea.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},

		/**
		 * Especifica a mensagem de erro que será exibida, caso o estado do textarea seja inválido.
		 */
		errorMessage: {
			type: String,
			default: 'Valor inválido',
		},


		/**
		 * Especifica se a largura do textarea deve ser fluida.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	components: {
		CdsIcon
	},

	data() {
		return {
			internalValue: this.value,
		};
	},

	computed: {
		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		stepperInputDynamicClass() {
			let stepperInputClass = this.fluid ? 'textarea--fluid' : 'textarea';

			switch(!this.isBeingFocused) {
				case !this.disabled && this.state === 'valid':
					return stepperInputClass += ' textarea--valid';
				case !this.disabled && this.state === 'invalid':
					return stepperInputClass += ' textarea--invalid';
				case this.disabled:
					return stepperInputClass += ' textarea--disabled';
			}
			return stepperInputClass;
		},
		
		validState() {
			return this.state === 'valid';
		},

		errorState() {
			return this.state === 'invalid';
		},


		loadingState(){
			return this.state === 'loading';
		},

		inputClass() {
			return this.fluid ? 'textarea__field--fluid' : 'textarea__field';
		},
	},

	watch: {
		internalValue(value) {
			/**
			* Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
			*/
			this.$emit('input', value);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

textarea {
	padding: pa(3);
	resize: none;
	height: 130px;

	&:focus {
		outline: none;
	}

	&::-webkit-scrollbar {
		width: 12px;
		border-radius: 20px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: $n-40;
		border-radius: 12px;
		border-right: 3px solid transparent;
		border-left: 3px solid transparent;
		background-clip: padding-box;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: $n-50;
	}
}
.textarea {
	display: flex;
	border-radius: $border-radius-extra-small;
	width: fit-content;
	width: -moz-fit-content;

	&__input {
		width: 429px;
		height: 130px;
		border: 1px solid $n-50;
		border-radius: $border-radius-extra-small;
		resize: none;
		padding: pa(3);

		&:focus {
			border: 1px solid $bn-300;
			box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
		}
	}

	&__icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 0;
		margin-top: 12px;
	}

	&__icon--check-icon {
		position: absolute;
		left: 429px;
	}

	&__icon--alert-circle-icon {
		position: absolute;
		left: 429px;
	}

	&__icon--spinner-icon {
		position: absolute;
		left: 420px;
	}

	&--fluid {
		@extend .textarea;
		width: 100%;

		.textarea__input {
			width: 100%;
		}

		.textarea__icon--alert-circle-icon, 
		.textarea__icon--check-icon {
			left: 1149px;
		}
		.textarea__icon--spinner-icon {
			left: 1140px;
		}
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-700;

		&--required-indicator {
			color: $rc-600;
		}
	}

	&__field {
		padding: pa(3);
		margin: mr(2);
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .textarea__field;
			width: 100%;
		}
	}

	&--valid {
		@extend .textarea;

		.textarea__input {
			border: 1px solid $gp-500;

			&:focus {
				box-shadow: 0 0 0 0.2rem rgba($gp-300, .45) !important;
			}
		}
	}

	&--invalid {
		@extend .textarea;

		.textarea__input {
			border: 1px solid $rc-600;
			
			&:focus {
				box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
			}
		}
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin-top: 2px;
	}
}
</style>
