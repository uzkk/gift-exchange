const { resolve } = require('path')

// workaround vuepress #1525
const App = require('@vuepress/core/lib/node/App')
App.prototype.addPage = async function (options) {
  const Page = require('@vuepress/core/lib/node/Page')
  options.permalinkPattern = this.siteConfig.permalink
  const page = new Page(options, this)
  await page.process({
    markdown: this.markdown,
    computed: new this.ClientComputedMixinConstructor(),
    enhancers: this.pluginAPI.getOption('extendPageData').items,
  })
  const index = this.pages.findIndex(({ path }) => path === page.path)
  if (index >= 0) {
    this.pages.splice(index, 1, page)
  } else {
    this.pages.push(page)
  }
}

module.exports = ({
  base = '/gift-exchange/',
  server = 'https://uzkk.shigma.xyz/gift-exchange/',
}, context) => ({
  name: '@uzkk/gift-exchange',

  plugins: [
    ['@vuepress/register-components', {
      components: [
        { name: 'GiftExchange', path: resolve(__dirname, 'App') },
      ],
    }],
  ],

  additionalPages: [{
    title: '六一礼物互换活动',
    path: base,
    permalink: base,
    frontmatter: {
      description: '六一礼物互换活动排号系统',
      layout: 'GiftExchange',
      footer: false,
    },
  }],

  enhanceAppFiles: {
    name: 'uzkk-gift-exchange-base.js',
    content: `export default ({ Vue }) => {
  Vue.prototype.UZKK_GIFT_EXCHANGE_BASE = ${JSON.stringify(base)}
  Vue.prototype.UZKK_GIFT_EXCHANGE_SERVER = ${JSON.stringify(server)}
}`,
  },
})
