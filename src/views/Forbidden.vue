<template>
  <div class="forbidden_layout">
    <div>
      <h1>Ой!</h1>
      <span>
        <h2>Похоже, мне не удалось подобрать <br/> нужную вам страницу.</h2>
        <h3>Код ошибки: 404.</h3>
      </span>
    </div>
    <div class="face">
      <router-link to="/" class="button_show"><p>Начать сначала</p></router-link>
      <img src="../assets/Forbidden/person.png" alt="Упс...">
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.forbidden_layout
  padding-top 50px
  max-height calc(100% - 50px)
  overflow-y auto
  display flex
  justify-content center
  align-items center
  flex-wrap wrap
  flex-grow 1
  div
    display flex
    flex-wrap wrap
    justify-content center
    max-width 98%
    h1
      font-size 1000%
      line-height .8
    span
      display flex
      flex-direction column
      justify-content space-between
  .face
    display flex
    flex-wrap wrap
    align-items center
    img, a
      flex-grow 1
      max-width 98%
.button_show
  margin 20px
  background-color #80808014
  padding 10px 15px
  border-radius 20px
  font-size 20px
  cursor pointer
  transition all .3s
  &:hover
    box-shadow 0px 0px 6px #add3ff
  &:active
    box-shadow inset 0px 0px 6px #add3ff
    opacity .8
</style>
