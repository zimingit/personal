<template>
<div>
  <div class="top">
    <h1> Notesy {{user}}</h1>
    <button class="create" @click.prevent="create()">Создать</button>
  </div>
  <div class="notes">
    <div class="note" v-for="(note, i) in notes" :key="note.name + i" @contextmenu.prevent="remove(note)">
      <input v-model.lazy="note.name" @change="update(note)"/>
      <p>{{note.description}}</p>
      <p>{{note.tags.join(', ')}}</p>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'Notesy',
  props: ['userName'],
  data () {
    return {
      user: this.userName || '',
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
  created () {
    // Если пришли с user'ом и в localStorage сохранен user и они отличаются, то перезаписываем ls
    if (this.user && localStorage.user && this.user !== localStorage.user) {
      localStorage.user = this.user
    }
    setTimeout(() => {
      console.log(this.notes)
    }, 5000)
  },
  methods: {
    create () {
      this.newNote.user = this.user
      this.newNote.id = this.notes.length
      this.newNote.name = (this.notes.length + 1) + ' запись в блокнот'
      this.$db.collection('notes').add(this.newNote)
    },
    remove (note) {
      this.$db.collection('notes')
        .doc(note.id)
        .delete()
    },
    update (note) {
      this.$db.collection('notes')
        .doc(note.id)
        .set(note)
        .then(() => {
          console.log('note updated!')
        })
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
