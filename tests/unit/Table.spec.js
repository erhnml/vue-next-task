import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('Table.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Search)
    expect(wrapper.text()).toMatch('Ara')
  })
})
