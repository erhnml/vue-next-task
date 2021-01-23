import { shallowMount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

describe('Pagination.vue', () => {
  let wrapper;
  const size = 10;
  const total = 5000;
  const totalPage = Math.ceil(total / size);
  beforeEach(() => {
    wrapper = shallowMount(Pagination, {
      propsData: {
        total,
        modelValue: 1,
        size
      }
    })
  });
  
  test('renders pagination', () => {
    const pages = wrapper.findAll('.pagination .page');
    expect(pages.length).toBe( totalPage + 2);
  });

  test('prev and next button disable', async () => {
    const pages = wrapper.findAll('.pagination .page');
    expect(pages[0].attributes('disabled')).toBe("");
    await wrapper.setProps({ modelValue: totalPage })
    expect(pages[pages.length - 1].attributes('disabled')).toBe("");
  });

  test('emit update:modelValue', async () => {
    wrapper.vm.$emit('update:modelValue');
    wrapper.vm.$emit('update:modelValue', 13);
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'].length).toBe(2)
      expect(wrapper.emitted()['update:modelValue'][1]).toEqual([13])
  })
})



