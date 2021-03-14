import { mount } from '@vue/test-utils'
import home from '@/pages/index.vue'

describe('home', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(home)

  it('button click should increment the count text', async () => {
    expect(wrapper.text()).toContain('0')
    const button = wrapper.find('button')
    button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('1')
  })
})
