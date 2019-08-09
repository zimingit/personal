<template>
<div class="notesy_create">
  <div class="notesy_create_wrapper">
    <NotesyLogo/>
    <label for="name">Укажи секретное слово</label>
    <input id="name" placeholder="alexeyzimin" v-model="user">
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
// primary color #7fb8af
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
  background #7fb8af
  label
    font-size 31px
  input
    font-size 31px
    text-align center
    margin 30px
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
