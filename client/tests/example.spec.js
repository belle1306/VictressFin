import { mount } from '@vue/test-utils'
import App from './../../src/App.vue'

describe('App.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(App, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})