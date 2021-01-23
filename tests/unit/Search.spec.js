import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('Search.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Search, {
      propsData: {
        modelValue: '',
      }
    })
  });
  
  test('emit onSearch', async () => {
    const input = wrapper.find('input');
    await input.trigger('focus');
    await input.trigger('keyup.enter');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().onSearch).toBeTruthy()
    expect(wrapper.emitted().onSearch.length).toBe(2)
  });
})



