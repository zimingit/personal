<template>
<div class="notesy_create">
  <div class="notesy_create_wrapper">
    <NotesyLogo size="extra-large" label="notesy"/>
    <p for="name">Укажи секретное слово</p>
    <input id="name" placeholder="alexeyzimin" v-model="user" @keyup.enter="setUser()">
    <span v-if="error">Нужно больше символов :)</span>
    <span class="button_show" @click.prevent="setUser()">Начать</span>
  </div>
</div>
</template>
<script>
import NotesyLogo from './NotesyLogo'
export default {
  name: 'NotesyCreate',
  data () {
    return {
      user: '',
      error: false
    }
  },
  components: {
    NotesyLogo
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
.notesy_create_wrapper
  max-width 700px
  width 700px
  max-width 100vw
  min-height 100vh
  display flex
  flex-direction column
  align-items center
  justify-content center
  background #80CBC4
  p
    font-size 31px
    padding 0
    margin 30px
  input
    font-size 31px
    text-align center
    margin 20px
    max-width 90vw

.button_show
  margin 30px
  width 50%
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
