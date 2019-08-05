<template>
<div>
  <div class="top">
    <p>Функционал этой страницы очень сырой :)</p>
    <label v-if="needLogin" >На чье имя записать?
      <input v-model="user">
      <button @click.prevent="setUser()">Поехали</button>
    </label>
    <h1> Noticsta {{user}}</h1>
    <button class="create" @click.prevent="createNote()">Создать</button>
  </div>
  <div class="notes">
    <div class="note" v-for="(note, i) in notes" :key="note.name + i">
      <p>{{note.name}}</p>
      <p>{{note.description}}</p>
      <p>{{note.tags.join(', ')}}</p>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'Noticsta',
  props: ['userName'],
  data () {
    return {
      user: this.userName || '',
      needLogin: !this.userName,
      notes: [],
      newNote: {
        date: new Date(),
        description: 'Тестовая запись в блокноте',
        name: 'Первая запись в блокнот',
        user: '',
        id: 0,
        tags: ['тег1', 'тег2']
      }
    }
  },
  firestore () {
    return {
      notes: this.$db.collection('notes').where('user', '==', this.user).orderBy('id')
    }
  },
  mounted () {
    if (localStorage.user) {
      this.user = localStorage.user
      if (!this.userName) {
        this.setUser()
      }
    }
  },
  methods: {
    setUser () {
      this.$router.push(`/Projects/Noticsta/${this.user}`)
      this.$destroy()
    },
    createNote () {
      this.newNote.user = this.user
      this.newNote.id = this.notes.length
      this.newNote.name = (this.notes.length + 1) + ' запись в блокнот'
      this.$db.collection('notes').add(this.newNote)
    }
  },
  watch: {
    user (newName) {
      localStorage.user = newName
    },
    userName (newUserName) {
      if (newUserName === undefined) return
      this.needLogin = false
      localStorage.user = newUserName
    }
  }
}
</script>
<style lang="stylus" scoped>
.notes
  display flex
  flex-wrap wrap
  justify-content flex-start
.note
  display flex
  flex-direction column
  min-width 32%
  max-width 98%
  margin 5px
  border 1px solid black
  border-radius 5px
  @media (orientation: portrait)
    min-width 95%
    margin-left 2.5%
    margin-right 2.5%
.create
  position fixed
  bottom 10px
  right 10px
</style>
