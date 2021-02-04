import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { SignUp } from "@/views/users/SignUp"

const wrapper = shallowMount(SignUp)

// it('sets the correct default data', () => {
//   expect(typeof SignUp.data).toBe('function')
//   const defaultData = SignUp.data()
//   expect(defaultData.message).toBe('hello!')
// })

describe('SignUp', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(SignUp)
        const vm = new Constructor().$mount()

        expect(vm.$el.querySelector('').textContent)
        .toEqual()
    })
})