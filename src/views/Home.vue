<template>
  <div class="home">
    <h1>Aleksey Zimin</h1>
    <div>
      <a href="mailto:mailofauroraborealis@gmail.com">
        <img src="../assets/contacts/gmail.png" width="50" height="50" alt="Gmail">
      </a>
      <a href="mailto:mailofauroraborealis@gmail.com">
        mailofauroraborealis@gmail.com
      </a>
    </div>
    <div>
      <a href="https://github.com/zimingit">
        <img src="../assets/contacts/github.png" width="50" height="50" alt="Github">
      </a>
      <a href="https://github.com/zimingit">
        github.com/zimingit
      </a>
    </div>
    <div>
      <a href="https://t.me/martinvc">
        <img src="../assets/contacts/telegram.png" width="50" height="50" alt="Telegram">
      </a>
      <a href="https://t.me/martinvc">
        @martinvc
      </a>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.home
  height 100%
  overflow auto
  display flex
  padding 40px 10px
  flex-direction column
  div
    display flex
    align-items center
    justify-content center
    padding  40px 10px
    &:hover
      background-color #f8f8f8
  h1
    font-size 500%
    font-weight 500
  a
    font-size 300%
    word-wrap break-word
    max-width calc(100% - 50px)
    color #2c3e50
    text-decoration none
    &:first-child
      display flex
  img
    margin-right 20px
@media (orientation: portrait)
  a
    font-size 100% !important
</style>
