<template>
  <div class="news_layout">
    <span class="news_name_bg">ALEKSEY<br/>ZIMIN</span>

    <!--
    <div class="news_item create_dialog" v-if="createNews">
      <span class="news_item_number">04</span>
      <h1 class="news_item_label">Название: <input v-model="newsData.label"/></h1>
      <div class="news_item_description_create">
        <br/><br/><br/><br/>
        <div class="news_item_description_icon_create">
          Картинка: <input v-model="newsData.iconCircle"/>
        <div class="news_item_description_content">
        </div>
          Описание: <input v-model="newsData.description"/>
      </div>
      <button @click="addNews()">Добавить</button>
      <button @click="hideCreateDialog()">Закрыть</button>
      </div>
      </div>
    -->
    <div class="news_item_wrapper">
      <div class="news_item">
        <span class="news_item_number">04</span>
        <h1 class="news_item_label" :style="getTextShadow(0)">ЧТО ПРОИСХОДИТ?</h1>
        <div class="news_item_description">
          <div class="news_item_description_icon">
          </div>
          <div class="news_item_description_content">
            <p>
            Уверен, каждый задается вопросом "Где обновления, Алёша?". Да, в последнее время с ними печально :(<br/>
              Нормальный бек будет не скоро, а офлайн режим работы Notesy на подходе.<br/>
              Как-то так :3
            <br/><br/>
            <br/><br/>
            <strong>Когда? </strong> Нинаю
            <strong>Где? </strong> Тута
            <strong>Ты там будешь? </strong> Часть меня точно будет :)
            <br/><br/>
            <br/><br/>
            </p>
            <strong>Где посмотреть подробнее? </strong> <a href='https://alekseyzimin.com/#/Projects/Notesy'>*Подготовленная кликабельная ссылка*</a>
          </div>
        </div>
      </div>
    </div>

    <div class="news_item_wrapper">
      <div class="news_item">
        <span class="news_item_number">03</span>
        <h1 class="news_item_label" :style="getTextShadow(1)">MSK VUE.JS MEETUP #3</h1>
        <div class="news_item_description">
          <div class="news_item_description_icon">
          </div>
          <div class="news_item_description_content">
            <p>
            С каждым днем Vue.js становится популярней,
            все больше разработчиков и компаний делают
            ставку на данную технологию — 19 сентября при
            поддержке компании Voximplant пройдет митап сообщества MSK VUE.JS,
            посвященный фреймворку. Спикеры поделятся опытом разработки,
            участники сообщества обсудят перспективы развития Vue.js.
            <br/><br/>
            <strong>Когда? </strong> 19 сентября, четверг
            <br/><br/>
            <strong>Где? </strong> БЦ SkyLight, Ленинградский пр-т. 39, строение 79
            <br/><br/>
            <strong>Ты там будешь? </strong> Многовероятно :)
            <br/><br/>
            <strong>Где взять больше информации? </strong> <a href='https://voximplant.timepad.ru/event/98675'>*Подготовленная кликабельная ссылка*</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="news_item_wrapper">
      <div class="news_item">
        <span class="news_item_number">02</span>
        <h1 class="news_item_label" :style="getTextShadow(2)">MSK VUE.JS MEETUP #2</h1>
        <div class="news_item_description">
          <div class="news_item_description_icon">
          </div>
          <div class="news_item_description_content">
            <p>
            Вторая по счету встреча для разработчиков, где будем обсуждать прогрессивный фреймворк Vue.js в приятной компании за едой и напитками.
            <br/><br/>
            <br/><br/>
            <strong>Когда? </strong> 15 августа, четверг
            <strong>Где? </strong> Москва, ул. Балчуг, 7
            <strong>Ты там будешь? </strong> Конечно :)
            <br/><br/>
            <br/><br/>
            </p>
            <strong>Где почитать подробнее? </strong> <a href='https://voximplant.timepad.ru/event/1022185'>*Подготовленная кликабельная ссылка*</a>
          </div>
        </div>
      </div>
    </div>

    <div class="news_item_wrapper">
      <div class="news_item">
        <span class="news_item_number">01</span>
        <h1 class="news_item_label" :style="getTextShadow(3)">АКТИВНОСТЬ</h1>
        <div class="news_item_description">
          <div class="news_item_description_icon">
          </div>
          <div class="news_item_description_content">
            <p>
            Здесь можно последить за моей активностью :)
            <br/><br/>
            #embed #wakatime
            </p>
          </div>
        </div>
        <figure>
          <embed src="https://wakatime.com/share/@cbea2116-1b02-482a-a5a3-a74fb1dcb77e/cddfcabb-5ba9-4acc-9579-43c9097c8db4.svg"/>
        </figure>
      </div>
    </div>
    <!-- <p>{{news}}</p> -->
    <!-- <button class="add_news" @click="showCreateDialog()"> Создать </button> -->
  </div>
</template>
<script>
import _ from 'lodash'
const colors = ['#ea4335', '#fbbc05', '#34a853', '#00bcd4', '#9c27b0', '#f44336', '#03a9f4', '#009688', '#8bc34a', '#cddc39', '#ff9800']
export default {
  data () {
    return {
      colors: _.shuffle(colors),
      news: [],
      createNews: false,
      newsData: {
        date: new Date(),
        label: '',
        description: '',
        iconCircle: ''
      }
    }
  },
  firestore () {
    return {
      news: this.$db.collection('news').orderBy('date')
    }
  },
  created () {
    console.log(this.$db)
  },
  methods: {
    getTextShadow (i) {
      return {'text-shadow': `3px 3px 0 ${this.colors[i]}`}
    },
    showCreateDialog () {
      this.createNews = true
      document.getElementById('app').scrollTop = 0
    },
    hideCreateDialog () {
      this.createNews = false
    },
    addNews () {
      this.$db.collection('news').add(this.newsData)
      this.hideCreateDialog()
    }
  }
}
</script>

<style lang="stylus" scoped>
figure
  margin -20px

.news_layout
  max-height 100%
  min-height 100%
  position relative
  // display flex
  // flex-direction column
  // align-items center
  .news_name_bg
    align-self center
    max-height 0px
    overflow visible
    font-size 250px
    font-weight bold
    letter-spacing 80px
    position fixed
    top 20%
    left 0
    width 100%
    text-align center
    z-index -1
    color #FAFAFA
    text-shadow 0px 5px 20px #e0e0e0

.news_item_wrapper
  display block
  margin 30px auto
  max-width 100%
  width 1000px

.news_item
  display flex
  flex-direction column
  position relative
  background white
  max-width 1500px
  max-width calc(100% - 60px)
  width 1000px
  box-shadow 0px 0px 20px #e0e0e0
  padding 30px
  &:hover
    .news_item_description_icon
      width 100%
      border-radius 5px

.news_item_number
  position absolute
  height 50px
  width 50px
  left -55px
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
  display flex
  flex-direction column
  align-items center
  a
    &:hover
      border-bottom 3px dotted grey
  &_icon
    width 300px
    height 300px
    border-radius 50%
    flex-shrink 0
    background-position center center
    background-size 150%
    background-repeat no-repeat
    transition all .3s
    &:hover
      background-size 100%

@media (orientation: portrait)
  .news_item_number
    left 5px
    top 5px
  .news_item_label
    position relative
    text-align center
    letter-spacing 4px
    left auto

//Создание контента
.add_news
  position fixed
  bottom 10px
  right 30px
  border none
  padding 15px
  background #e0e0e0
  border-radius 5px
  cursor pointer
  box-shadow 2px 2px 9px #bdbdbd
  transition all .3s
  outline none
  &:hover
    box-shadow 4px 4px 9px #bdbdbd
  &:active
    opacity .8

// Хардкоды фоновых картинок :(
.news_item_wrapper
  &:nth-child(2)
    .news_item
      &:hover
        .news_item_description_icon
          background-size 100%
    .news_item_description_icon
      background-image url('../assets/news/notesy.jpg')
      background-position center 53%
      background-size 350%
      &:hover
        background-image url('../assets/news/notesy_white.jpg')
        background-position center 30%
  &:nth-child(3)
    &:hover
      .news_item_description_icon
        background-position center 20%
    .news_item_description_icon
      background-image url('../assets/news/pavel.jpg')
      &:hover
        background-image url('../assets/news/pavel_face.jpg')
        background-position center 20%
  &:nth-child(4)
    .news_item_description_icon
      background-image url('../assets/news/voximplant.jpg')
      &:hover
        background-image url('../assets/news/voximplant_meetup_1.jpg')
        background-position center 80%
  &:nth-child(5)
    &:hover
      .news_item_description_icon
        background-position 40% 60%
    .news_item_description_icon
      background-image url('../assets/news/alex_2.jpg')
      background-position 40% 50%
      &:hover
        background-image url('../assets/news/alex.jpg')
        background-position 40% 60%
</style>
