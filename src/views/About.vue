<template>
  <div>
    <div class="step_wrap">
      <span class="active" ref="activeScreen"></span>
      <a v-for="scr in screens" :key="scr" :href="'#screen' + scr" @click="setPath(scr)" :ref="'marker' + scr">
        <span></span>
      </a>
    </div>
    <div class="home" ref="home" @click="goNext()">
      <div class="screen" id="screen1">
        <h1>Привет!</h1>
      </div>
      <div class="screen" id="screen2">
        <h2>Я подготовил эту страницу, чтобы ты узнал кто я, если мы еще не знакомы :)</h2>
      </div>
      <div class="screen" id="screen3">
        <h3>Называют меня Алексеем, занимаюсь я frontend разработкой, изучаю все что с ней связано и делюсь своими мыслями и идеями с окружающими.</h3>
        <h3>Я еще не придумал полный текст для этой страницы, но в скором времени он обязательно появится.</h3>
      </div>
      <span id="bot"></span>
      <div class="screen" id="screen4">
        <h3>Большинство страниц сайта находятся в разработке, поэтому страницы часто будут не найдены :)</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data () {
    return {
      screens: [1, 2, 3, 4],
      screen: 1
    }
  },
  methods: {
    setPath (screen) {
      if (this.screens.indexOf(screen) === -1) return
      this.screen = screen
      this.scrollTo()
      this.$refs.activeScreen.style.top = this.$refs['marker' + screen][0].children[0].offsetTop - 3 + 'px'
      this.$refs.activeScreen.style.width = '4px'
      this.$refs.activeScreen.style.height = '30px'
      this.$refs.activeScreen.style.marginLeft = '-2px'
      setTimeout(_ => {
        this.$refs.activeScreen.style.width = '16px'
        this.$refs.activeScreen.style.height = '16px'
        this.$refs.activeScreen.style.marginLeft = '-8px'
      }, 250)
      setTimeout(_ => this.$router.push(this.$route.path), 200)
    },
    goNext () {
      if (this.$refs['marker' + (this.screen + 1)] !== undefined) {
        this.$refs['marker' + (this.screen + 1)][0].click()
      }
    },
    scrollTo () {
      let el = this.$refs.home
      el.style.backgroundPosition = `center ${this.screen * 25}%`
      el.style.backgroundSize = `${100 + (this.screen * 20)}%`
    }
  }
}
</script>
<style lang="stylus" scoped>
.step_wrap
  position fixed
  z-index 1
  left 5%
  top calc(50% - 35vh)
  width 1px
  height 70vh
  background grey
  display flex
  flex-direction column
  justify-content space-between
  a
    width 50px
    height 50px
    flex-shrink 0
    margin-left -25px
    border-radius 50%
    display flex
    user-select none
    span
      margin auto
      width 10px
      height 10px
      border-radius 50%
      background grey
    &:nth-child(2)
      margin-top -20px
    &:last-child
      margin-bottom -20px
  .active
    width 16px
    height 16px
    flex-shrink 0
    position absolute
    border-radius 50%
    background #34a853
    margin-left -8px
    transition all .5s
.screen
  height calc(100vh - 80px)
  flex-grow 1
  flex-shrink 0
  padding 40px 40px
.home
  display flex
  flex-direction column
  background-image url(../assets/background/mountain.png)
  background-position top center
  background-size 100%
  background-repeat no-repeat
  max-height 100vh
  overflow hidden
  transition all .5s
  will-change transform
  h1
    font-size 500%
    font-weight 500
  h2
    font-size 200%
    font-weight 200
  h3
    font-size 20px
    font-weight 400
@media (orientation: portrait)
  h1
    font-size 350% !important
</style>
