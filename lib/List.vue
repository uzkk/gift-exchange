<template>
  <div>
    <transition-group name="user-list" tag="ul" class="user-list">
      <li v-for="item in $app.list" :key="item">
        {{ item }}
      </li>
    </transition-group>
    <div class="button-container">
      <template v-if="$app.auth === 1">
        <Button @click="shuffle">随机顺序</Button>
      </template>
      <Button @click="refresh" :disabled="loading">
        <template v-if="!loading">刷新列表</template>
        <template v-else>
          <i class="icon-loading"/>正在获取列表<i class="icon-loading"/>
        </template>
      </Button>
      <Button @click="$app.phase = 'Login'">返回登录页面</Button>
    </div>
  </div>
</template>

<script>

import { Button } from '@uzkk/components'

function shuffle (list) {
  list = list.slice()
  for (let i = 0; i < list.length; i++) {
    const j = Math.floor(Math.random() * list.length)
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

export default {
  components: { Button },

  inject: ['$app'],

  data: () => ({
    loading: false,
  }),

  mounted () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.loading = true
      const response = await fetch(this.UZKK_GIFT_EXCHANGE_SERVER)
      const list = (await response.json()).map(decodeURIComponent)
      this.loading = false
      this.$app.list = list
    },
    shuffle () {
      this.$app.list = shuffle(this.$app.list)
    },
  },
}

</script>

<style lang="stylus">

.user-list
  max-width 500px
  margin 0 auto 3rem

  li
    line-height 1.6em
    transition transform 0.5s ease

</style>
