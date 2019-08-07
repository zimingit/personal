<template>
<div class="noticsta_create">
  <div class="noticsta_create_wrapper">
    <label>На чье имя записать?
      <input placeholder="alexeyzimin" v-model="user">
    </label>
    <span v-if="error">Нужно больше символов :)</span>
    <span class="button_show" @click.prevent="setUser()">Начать</span>
  </div>
</div>
</template>
<script>

export default {
  name: 'NoticstaCreate',
  data () {
    return {
      user: '',
      error: false
    }
  },
  methods: {
    setUser () {
      if (this.user.length > 3) {
        this.$router.push(`/Projects/Noticsta/${this.user}`)
      } else {
        this.error = true
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.noticsta_create
  display flex
  justify-content center
.noticsta_create_wrapper
  max-width 300px
  display flex
  flex-direction column
  align-items center
  label
    font-size 26px
  input
    font-size 24px
    text-align center

.button_show
  margin-top 30px
  width 50%
  color white
  font-weight 800
  box-shadow 0px 2px 0px #cdcaca
  background #ab47bc
  padding 10px 15px
  border-radius 3px
  cursor pointer
  transition all .3s
  position relative
  &:after
    content ''
    display block
    position absolute
    pointer-events none
    top 0
    left 0
    transform translateX(-100%)
    width 100%
    height 100%
    transition transform .3s
  &:hover
    &:after
      background linear-gradient(220deg, transparent 0%, transparent 50%, #ffffff15 50%, #ffffff15 100%)
      transform translateX(0)
  &:active
    &:after
      background linear-gradient(220deg, transparent 0%, transparent 50%, #ffffff15 50%, #ffffff15 100%)
      transform translateX(100%)
    opacity .8
</style>
