<template>
<div class="notesy_create">
  <div class="notesy_create_wrapper">
    <NotesyLogo size="extra-large" label="notesy" action="passive"/>
    <p for="name" class="text">Set a secret word</p>
    <icon name="arrow_down"/>
    <input id="name" placeholder="your secret here" v-model="user" @keyup.enter="setUser()">
    <span v-if="error">Нужно больше символов :)</span>
    <span class="button_show" @click.prevent="setUser()">Go</span>
  </div>
</div>
</template>
<script>
import NotesyLogo from './NotesyLogo'
import Icon from '../Icon'
export default {
  name: 'NotesyCreate',
  data () {
    return {
      user: '',
      error: false
    }
  },
  components: {
    NotesyLogo,
    Icon
  },
  methods: {
    setUser () {
      if (this.user.length > 3) {
        this.$router.push(`/Projects/Notesy/${this.user}`)
      } else {
        this.error = true
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
// primary color #7fb8af or #80CBC4 or #00bcd4
.notesy_create
  display flex
  justify-content center
  color white
  height 100%
.notesy_create_wrapper
  max-width 700px
  width 700px
  max-width 100vw
  height 100%
  display flex
  flex-direction column
  align-items center
  justify-content space-evenly
  background #80CBC4
  p
    font-size 31px
    padding 0
    margin 0
    &.text
      margin-top 20px
  input
    font-size 31px
    text-align center
    margin 10px
    padding 8px 15px
    max-width 370px
    width 370px
    max-width 80vw
    outline none
    border-radius 3px
    border none

.button_show
  margin 10px
  width 370px
  max-width 370px
  max-width 80vw
  color black
  font-weight 800
  font-size 26px
  box-shadow 0px 2px 0px #cdcaca
  background white
  padding 10px 15px
  border-radius 3px
  cursor pointer
  transition all .3s
  overflow hidden
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
      background linear-gradient(220deg, transparent 0%, transparent 50%, #7fb8af20 50%, #7fb8af20 100%)
      transform translateX(0)
  &:active
    &:after
      background linear-gradient(220deg, transparent 0%, transparent 50%, #7fb8af20 50%, #7fb8af20 100%)
      transform translateX(100%)
    opacity .8
</style>
