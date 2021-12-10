import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import ClusteredMultiselect from '../../src/components/ClusteredMultiselect.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const options = [
	{ title: 'Item 1' },
	{ title: 'Item 2' },
	{ title: 'Item 3' },
];

test('Component is mounted properly', () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [options[0]],
		},
		attachTo: document.body,
	});

	expect(wrapper).toMatchSnapshot();
});

test('If the group labels are not shown when theres no selected items', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [],
		},
		attachTo: document.body,
	});

	wrapper.trigger('click');
	await wrapper.vm.$nextTick();

	expect(wrapper.findAll('.cds-multiselect__group-label').length).toBe(0);
});

test('If the group labels are shown when theres selected items', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [
				{ title: 'Item 1' },
			],
		},
		attachTo: document.body,
	});
	
	// Do Your Magic
	wrapper.trigger('click');
	await wrapper.vm.$nextTick();
	
	expect(wrapper.findAll('.cds-multiselect__group-label').length > 0).toBe(true);
});

test('If "select all" option are shown when theres no selected items', () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [],
		},
		attachTo: document.body,
	});

	const prependOptionText = wrapper.findAll('.cds-multiselect__option').at(0).text();

	expect(prependOptionText).toBe('Selecionar todos');
});

test('If "select all" option works as expected', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [],
		},
		attachTo: document.body,
	});

	const prependOption = wrapper.findAll('.cds-multiselect__option').at(0);
	
	prependOption.trigger('click');
	await wrapper.vm.$nextTick();

	expect(prependOption.text()).toBe('Desfazer seleção');
});

test('If "unselect all" option are shown when theres selected items', () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [
				{ title: 'Item 1' },
			],
		},
		attachTo: document.body,
	});
	
	const prependOptionText = wrapper.findAll('.cds-multiselect__option').at(0).text();

	expect(prependOptionText).toBe('Desfazer seleção');
});

test('If "unselect all" option works as expected', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [
				{ title: 'Item 1' },
			],
		},
		attachTo: document.body,
	});
	
	const prependOption = wrapper.findAll('.cds-multiselect__option').at(0);
	
	prependOption.trigger('click');
	await wrapper.vm.$nextTick();

	expect(prependOption.text()).toBe('Selecionar todos');
});
