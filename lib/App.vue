<template>
  <FadeSlideTransition>
    <component :is="phase" :key="phase"/>
  </FadeSlideTransition>
</template>

<script>

import Login from './Login'
import List from './List'
import FadeSlideTransition from '@theme-uzkk/transitions/FadeSlide'
import { getSettings } from './storage'

export default {
  components: {
    Login,
    List,
    FadeSlideTransition,
  },

  data: () => ({
    ...getSettings(),
    phase: 'Login',
    list: [],
  }),

  created () {
    if (this.auth) {
      this.phase = 'List'
    }
  },

  provide () {
    return {
      $app: this,
    }
  },
}

</script>

<style lang="stylus" src="./index.styl"/>
