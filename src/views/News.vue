<template>
  <div class="news_layout">
    <span class="news_name_bg">ALEKSEY<br/>ZIMIN</span>

    <div class="news_item">
      <span class="news_item_number">01</span>
      <h1 class="news_item_label">MSK VUE.JS MEETUP #2</h1>
      <p class="news_item_description">
        Вторая по счету встреча для разработчиков, где будем обсуждать прогрессивный фреймворк Vue.js в приятной компании за едой и напитками.
        <br/><br/>
        <strong>Когда? </strong> 15 августа, четверг
        <br/><br/>
        <strong>Где? </strong> Москва, ул. Балчуг, 7
        <br/><br/>
        <strong>Ты там будешь? </strong> Конечно :)
        <br/><br/>
        <strong>Где почитать подробнее? </strong> <a href='https://voximplant.timepad.ru/event/1022185'>*Подготовленная кликаельная ссылка*</a>
      </p>
    </div>

    <div class="news_item">
      <span class="news_item_number">02</span>
      <h1 class="news_item_label">MSK VUE.JS MEETUP #3</h1>
      <p class="news_item_description">
        С каждым днем Vue.js становится популярней,
        все больше разработчиков и компаний делают
        ставку на данную технологию — 19 сентября при
        поддержке компании Voximplant пройдет митап сообщества MSK VUE.JS,
        посвященный фреймворку. Спикеры поделятся опытом разработки,
        участники сообщества обсудят перспективы развития Vue.js.
        <br/><br/>
        <strong>Когда? </strong> 19 сентября, четверг
        <br/><br/>
        <strong>Где? </strong> Москва, ул. Мытная 66
        <br/><br/>
        <strong>Ты там будешь? </strong> Многовероятно :)
        <br/><br/>
        <strong>Где взять больше информации? </strong> <a href='https://voximplant.timepad.ru/event/98675'>*Подготовленная кликаельная ссылка*</a>
      </p>
    </div>

    <div class="news_item">
      <span class="news_item_number">03</span>
      <h1 class="news_item_label">АКТИВНОСТЬ</h1>
      <p class="news_item_description">
        Здесь можно последить за моей активностью :)
        <br/><br/>
        #embed #wakatime
      </p>
      <figure>
        <embed src="https://wakatime.com/share/@cbea2116-1b02-482a-a5a3-a74fb1dcb77e/cddfcabb-5ba9-4acc-9579-43c9097c8db4.svg"/>
      </figure>
    </div>

  </div>
</template>
<style lang="stylus" scoped>
figure
  margin -20px

.news_layout
  max-height 100%
  min-height 100%
  position relative
  display flex
  flex-direction column
  align-items center
  .news_name_bg
    align-self center
    max-height 0px
    overflow visible
    font-size 250px
    font-weight bold
    letter-spacing 80px
    position fixed
    top 20%
    z-index -1
    color #FAFAFA
    text-shadow 0px 5px 20px #e0e0e0

.news_item
  display flex
  flex-direction column
  position relative
  background white
  max-width 1500px
  max-width calc(100% - 60px)
  width 1000px
  margin 30px
  box-shadow 0px 0px 20px #e0e0e0
  padding 30px

.news_item_number
  position absolute
  left -50px
  top -30px
  transform rotate(-90deg)
  font-size 40px

.news_item_label
  width 100%
  font-weight bold
  letter-spacing 25px
  position absolute
  text-align left
  left -45px

.news_item_description
  width 100%
  margin 100px 0 30px 0
  font-size 25px
  a
    &:hover
      border-bottom 3px dotted grey

@media (orientation: portrait)
  .news_item_number
    left 5px
    top 5px
  .news_item_label
    position relative
    text-align center
    letter-spacing 4px
    left auto
</style>
