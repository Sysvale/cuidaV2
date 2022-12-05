import { shallowMount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import TextInput from '../../src/components/TextInput.vue';

import VueMask from 'v-mask';

const localVue = createLocalVue();
localVue.use(VueMask);

test('Component is mounted properly', () => {
	const wrapper = shallowMount(TextInput, {
		localVue,
	});

	expect(wrapper).toMatchSnapshot();
});

test('if the value is emited properly when the content is changed by input', async () => {
	const wrapper = shallowMount(TextInput, {
		localVue,
		propsData: {
			value: 'Some initial text',
		},
	});

	await flushPromises();

	wrapper.find('#cds-text-input').element.value = 'Some another text';
	wrapper.find('#cds-text-input').trigger('input');

	await flushPromises();

	expect(wrapper.emitted().input).toBeTruthy();
	expect(wrapper.emitted().input).toEqual([['Some another text']]);
});

describe('Styles based on the state tests', () => {
	test('if the the styles are applied properly when the state is "valid" and the input is not focused', async () => {
		const wrapper = shallowMount(TextInput, {
			localVue,
			propsData: {
				state: 'valid',
			},
		});

		await flushPromises();

		expect(wrapper.findAll('.text-input--valid').length).toBe(1);
	});

	test('if the the styles are applied properly when the state is "invalid" and the input is not focused', async () => {
		const wrapper = shallowMount(TextInput, {
			localVue,
			propsData: {
				state: 'invalid',
			},
		});

		await flushPromises();

		expect(wrapper.findAll('.text-input--invalid').length).toBe(1);
	});
});

test('if the input is blocked when the prop disabled is true', async () => {
	const wrapper = shallowMount(TextInput, {
		localVue,
		propsData: {
			disabled: true,
		},
	});

	await flushPromises();

	wrapper.find('#cds-text-input').trigger('input');

	expect(wrapper.emitted().input).toBeFalsy();
});

test('if the error message is displayed when state is invalid', async () => {
	const wrapper = shallowMount(TextInput, {
		localVue,
		propsData: {
			state: 'invalid',
			errorMessage: 'error message',
		},
	});

	await flushPromises();

	expect(wrapper.find('.text-input__error-message').text()).toBe('error message');
});

test('if fluid class is applied based on prop', async () => {
	const wrapper = shallowMount(TextInput, {
		localVue,
		propsData: {
			fluid: true,
		},
	});

	await flushPromises();

	expect(wrapper.find('.text-input--fluid').exists()).toBeTruthy();
});

test('if the mask is applied when prop mask is set', async () => {
	const wrapper = shallowMount(TextInput, {
		localVue,
		propsData: {
			value: '123',
			mask: '#-#-#',
		},
	});

	await flushPromises();

	expect(wrapper.emitted().input).toEqual([['1-2-3']]);
});

test('the component renderes correctly when an array mask is provided', async () => {
	const wrapper = shallowMount(TextInput, {
		localVue,
		mask: "['(##) ####-####', '(##) #####-####']",
	});

	await flushPromises();

	wrapper.find('#cds-text-input').element.value = '74912345678';
	wrapper.find('#cds-text-input').trigger('input');

	await flushPromises();

	expect(wrapper.emitted().input).toEqual([['(74) 91234-5678']]);

	wrapper.find('#cds-text-input').element.value = '7412345678';
	wrapper.find('#cds-text-input').trigger('input');

	await flushPromises();

	expect(wrapper.emitted().input).toEqual([['(74) 1234-5678']]);
});
