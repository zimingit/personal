<template>
  <div class="icon" :class="[`icon--${name}`, `icon--${size}`]">
    <img :src="require(`@/assets/icons/${name}.svg`)"
         :style="{'filter': `invert(${invert})`}"/>
  </div>
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: {},
    size: {
      default: 'small'
    },
    invert: {
      default: '1'
    }
  }
}
</script>

<style lang="stylus" scoped>
.icon
  position relative
  display inline-block
  vertical-align middle
  &:first-child
    margin-left 0
  &:last-child
    margin-right 0
  &--small
    width 1rem
    height 1rem
  &--normal
    width 2rem
    height 2rem
  &--medium
    width 3rem
    height 3rem
  &--large
    width 4rem
    height 4rem

  img
    width 100%
</style>
