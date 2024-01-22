const gsap = jest.createMockFromModule('gsap')

// You can add any specific mock implementations or properties here
gsap.CSSRulePlugin = jest.fn() // Mock CSSRulePlugin

module.exports = gsap
