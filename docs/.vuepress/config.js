module.exports = (context) => ({
  base: '/gift-exchange/',

  title: '二色幽紫蝶',

  description: '东方 Project - 从入坑到入坟',

  theme: 'uzkk',

  plugins: [
    [require('@uzkk/not-found')],
    [require('@uzkk/shared-assets')],
    [require('../..'), {
      base: '/',
    }],
  ],

  themeConfig: {
    search: false,
    nav: [
      { text: '主页', link: '/', exact: true },
      { text: 'GitHub', link: 'https://github.com/uzkk/gift-exchange', exact: false },
    ],
  },

  evergreen: () => !context.isProd,
})
