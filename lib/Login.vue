<template>
  <div>
    <div class="setting-container" v-if="!inputName">
      <span>邀请码：</span>
      <Input
        v-model="$app.code"
        placeholder="请输入邀请码"
        :size="1.1"
        @enter="login"
      />
    </div>
    <template v-else>
      <h3 class="tac">初次登录请输入用户名</h3>
      <div class="setting-container">
        <span>用户名：</span>
        <Input
          v-model="$app.name"
          placeholder="请输入用户名"
          :size="1.1"
          @enter="login"
        />
      </div>
    </template>
    <div class="button-container">
      <Button :disabled="isInvalid || loading" @click="login">
        <template v-if="!loading">登录</template>
        <template v-else-if="inputName">
          <i class="icon-loading"/>正在设置用户名<i class="icon-loading"/>
        </template>
        <template v-else>
          <i class="icon-loading"/>正在登录<i class="icon-loading"/>
        </template>
      </Button>
    </div>
  </div>
</template>

<script>

import { setSettings } from './storage'
import { Button, Input } from '@uzkk/components'

export default {
  components: { Button, Input },

  inject: ['$app'],

  data: () => ({
    inputName: false,
    loading: false,
  }),

  computed: {
    isInvalid () {
      return !/^[a-zA-Z0-9]{20}$/.test(this.$app.code)
    },
  },

  methods: {
    async login () {
      this.loading = true
      const response = await fetch(
        this.UZKK_GIFT_EXCHANGE_SERVER
          + this.$app.code
          + (this.inputName ? '?name=' + this.$app.name : '')
      )
      const json = await response.json()
      this.loading = false
      if (response.status !== 200) {
        console.error(json.error)
      } else {
        if (!json.name) {
          this.inputName = true
        } else {
          this.inputName = false
          this.$app.auth = json.admin ? 1 : 2
          this.$app.name = json.name
          this.$app.phase = 'List'
          setSettings(this.$app)
        }
      }
    },
  },
}

</script>

<style lang="stylus" scoped>

.setting-container + .setting-container
  margin-top 2rem

.button-container
  margin-top 4rem

</style>
