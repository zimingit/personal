<template>
<div>
  <div class="top">
    <h1> Notesy {{user}}</h1>
    <div class="create">
      <NotesyLogo v-if="!showEditor"
        @click.native="showEditorDialog()"
        label="NEW"
        backgroundColor="#80CBC4"
        labelColor="white"
        class="tool_item">
      </NotesyLogo>
    </div>
  </div>
  <transition name="fade-scale-up">
  <div class="dates_container" :class="{'scaled_down': showEditor}">
    <div class="date" v-for="day in noteByDatesComputed" :key="day.date.seconds">
      <div class="date_label_container">
        <h3>{{day.date}}</h3>
      </div>
      <transition-group name="item-list" class="notes_container" tag="div">
        <div class="note_wrapper" :class="{'hover': isHover(i, day)}"  v-for="(note, i) in day.notes" :key="note.id">
          <div class="note" v-pan="{stopline: -80}"
              @mouseover="hoverIndex = i + day.date"
              :style="{'border-left': `5px solid ${note.color || '#ffffff'}`, 'box-shadow': `-1px 2px 5px ${(note.color || '#80CBC4') + '40' }`}"
              >
            <!-- note body -->
            <h2 class="note_label">{{note.name}}</h2>
            <div class="note_content" v-html="note.description"></div>
            <TagInput class="note_tags" :value="note.tags" decorator="#" :editable="false" @select="selectTag"/>
          </div>
          <!-- note toolbar -->
          <div class="toolbar_container">
            <div v-if="!sure[note.id]" class="tool note_remove" @click="toggleSure(note)" title="Delete">
              <NotesyLogo backgroundColor="#80CBC4" labelColor="white">
                <icon name="close" slot="icon" />
              </NotesyLogo>
            </div>
            <div v-else class="tool note_remove" @click="remove(note)" title="Delete">
              <NotesyLogo label="Sure?" backgroundColor="#ff5722" labelColor="white"/>
            </div>
            <div class="tool note_edit" @click="editNote(note)" title="Edit">
              <NotesyLogo backgroundColor="#80CBC4" labelColor="white">
                <icon name="edit" slot="icon" />
              </NotesyLogo>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
  </transition>
  <transition name="fade-scale-down" tag="div" class="editor_wrapper">
    <NotesyEditor v-if="showEditor"
                  :note="noteToEdit"
                  @save="saveAndCloseEditor"
                  @close="closeEditor"/>
  </transition>
</div>
</template>
<script>
import vPan from '@/directives/vPan.js'
import NotesyLogo from './NotesyLogo'
import NotesyEditor from './NotesyEditor'
import TagInput from '../TagInput'
import Icon from '../Icon'
import $idb from './idbConstroller'

export default {
  name: 'Notesy',
  props: ['userName'],
  data () {
    return {
      user: this.userName || '',
      notes: [],
      sure: {},
      showEditor: false,
      showAdditionalConfig: false,
      selectedTag: '',
      hoverIndex: ''
    }
  },
  firestore () {
    return {
      // notes: this.$db.collection('notes').where('user', '==', this.user).orderBy('date', 'desc')
    }
  },
  components: {
    NotesyLogo,
    NotesyEditor,
    Icon,
    TagInput
  },
  directives: {
    'v-pan': vPan
  },
  created () {
    this.getFirebaseNotes()
    // Если пришли с user'ом и в localStorage сохранен user и они отличаются, то перезаписываем ls
    if (this.user && localStorage.user && this.user !== localStorage.user) {
      localStorage.user = this.user
    }
  },
  methods: {
    getFirebaseNotes () {
      this.$db.collection('notes')
        .where('user', '==', this.user)
        .orderBy('date')
        .get()
        .then(querySnapshot  => {
          this.notes = querySnapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
          return this.updateFirebaseNotes()
          console.log('FIREBASE LOADED')
        })
        .then(_ => {
          return this.updateLocalBase()
        })
        .catch(e => {
          $idb.getNotes(notes => {
            this.notes = notes.sort((a, b) => this.getDateFromTimestamp(b.date) - this.getDateFromTimestamp(a.date))
          })
          console.log('LOCALDB LOADED')
        })
    },
    // Создаем записи в firebase, которые были созданы локально без интернета
    updateFirebaseNotes () {
      return new Promise((resolve, reject) => {
        const firebaseOnly = true
        $idb.getNotes(notes => {
          notes
            .filter(n => n.id < 0 || n.needFirebaseUpdate || n.needFirebaseRemove)
            .forEach(note => {
              if (note.id < 0 && !note.needFirebaseRemove) {
                return this.create(note, firebaseOnly)
              } else if (note.needFirebaseUpdate) {
                delete note.needFirebaseUpdate
                return this.update(note, firebaseOnly)
              } else if (note.needFirebaseRemove) {
                delete note.needFirebaseRemove
                return this.remove(note, firebaseOnly)
              }
            })
          resolve(notes)
        })
      })
    },
    updateLocalBase () {
      this.notes.forEach(note => {
        $idb.setNote(note)
      })
      // this.$db.collection('notes')
      //   .where('user', '==', this.user)
      //   .orderBy('date')
      //   .get()
      //   .then(querySnapshot  => {
      //     querySnapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
      //       .forEach(note => {
      //         $idb.setNote(note)
      //       })
      //   })
    },
 
    create (noteToSave, fireBaseOnly) {
      noteToSave.user = this.user
      try {
        // throw new Error('no connection')
        this.$db
          .collection('notes')
          .add(noteToSave)
          .then(resonse => {
            console.log('note created!', resonse)
          })
      } catch (e) {
        if (fireBaseOnly) return
        noteToSave.id = 0 - (this.notes.length)
        noteToSave.date = { seconds: Math.floor(Date.now() / 1000) }
        $idb.setNote(noteToSave)
        this.notes.push(noteToSave)
      }
    },
    update (note, fireBaseOnly) {
      try {
        throw new Error('no connection')
        this.$db
          .collection('notes')
          .doc(note.id)
          .set(note)
          .then(resonse => {
            console.log('note updated!', resonse)
          })
      } catch (e) {
        if (fireBaseOnly) return
        note.needFirebaseUpdate = true
        $idb.setNote(note)
      }
    },
    remove (note, fireBaseOnly) {
      try {
        throw new Error('no connection')
        this.$db
          .collection('notes')
          .doc(note.id)
          .delete()
          .then(() => {
            console.log('note deleted!')
            $idb.delNote(note)
          })
      } catch (e) {
        if (fireBaseOnly) return
        this.notes = this.notes.filter(n => n.id !== note.id)
        note.needFirebaseRemove = true
        $idb.setNote(note)
      }
    },
    toggleSure (note) {
      this.$set(this.sure, note.id, true)
      setTimeout(_ => { this.sure[note.id] = false }, 2000)
    },
    // Создание и редактирование записей
    editNote (note) {
      this.noteToEdit = note
      this.showEditor = true
    },
    showEditorDialog () {
      let note = {
        date: new Date(),
        description: '',
        name: '',
        user: '',
        color: '',
        tags: []
      }
      this.editNote(note)
    },
    saveAndCloseEditor (html) {
      this.showEditor = false
      if (this.noteToEdit !== {}) {
        this.noteToEdit.description = html
        const currentNote = this.notes.find(note => note.id === this.noteToEdit.id)
        if (currentNote) {
          this.update(currentNote)
        } else {
          this.create(this.noteToEdit)
        }
        this.noteToEdit = {}
      }
    },
    closeEditor () {
      this.showEditor = false
    },
    getDateFromTimestamp (date) {
      const toDate = (secs) => new Date(secs * 1000)
      return toDate(date.seconds)
    },
    getDateFromTimestampFormatted (date) {
      date = this.getDateFromTimestamp(date)
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('.')
    },
    isHover (i, day) {
      return this.hoverIndex === i + day.date
    },
    // ----- Методы фильтрации ----- //
    selectTag (tag) {
      console.log('filterBy: ' + tag)
      // this.notes =this.$db.collection('notes').where('user', '==', this.user).orderBy('date')
      this.clearFocus()
    },
    clearFocus () {
      this.hoverIndex = ''
    }
  },
  computed: {
    noteByDatesComputed () {
      let notesByDate = {}
      const getDate = (date) => this.getDateFromTimestampFormatted(date)
      this.notes.filter(n => !n.needFirebaseRemove).forEach(note => {
        if (!notesByDate[getDate(note.date)]) {
          notesByDate[getDate(note.date)] = {
            date: getDate(note.date),
            notes: this.notes.filter(n => getDate(n.date) === getDate(note.date))
          }
        }
      })
      return notesByDate
    }
  },
  filters: {
    dateFormat (date) {
      let joiner = []
      joiner.push(date.getDate())
      joiner.push(date.getMonth())
      joiner.push(date.getFullYear())
      return joiner.join('.')
    }
  }
}
</script>
<style lang="stylus" scoped>
.dates_container
  display flex
  flex-direction column
  justify-content flex-start
  margin-bottom 50px
  transition opacity .3s, transform .3s
  &.scaled_down
    opacity 0
    transform scale(.9, 1)
  .date
    position relative
    margin-bottom 20px
    .date_label_container
      position absolute
      left 0px
      width 20px
      height calc(100% - 60px)
      top 0
      h3
        position sticky
        transform rotate(-90deg) translateX(-60px)
        top 40px

.notes_container
  margin-left 15px
  display flex
  flex-wrap wrap
  .note_wrapper
    @media (orientation: portrait)
      min-width 95%
      max-width 95%
    .toolbar_container
      position absolute
      display flex
      right 10px
      bottom 10px
      top 10px
      opacity 0
      transform scale(0)
      transform-origin right
      transition opacity .5s, transform .3s
      @media (orientation: portrait)
        right 0
        z-index 1 !important
        transform scale(1)
        opacity 1
        flex-direction column
      .tool
        margin 2px
        top 0
        position sticky

.note_wrapper
  display flex
  position relative
  flex-grow 1
  &.hover
    .note
      max-height none
    .toolbar_container
      opacity 1
      transform scale(1)
      z-index 3

.note
  position relative
  z-index 3
  display flex
  flex-direction row
  flex-wrap wrap
  min-width 30%
  flex-grow 1
  max-width 100%
  max-height 50vh
  min-height 130px
  overflow-y hidden
  background white
  margin 5px
  @media (orientation: portrait)
    min-width 100%
    max-width 100%
    &:after
      content ''
      position absolute
      top 5px
      right 5px
      background-image url('../../assets/icons/swipe.svg')
      background-size cover
      width 15px
      height 15px
      opacity .3
  &_tags
    flex-grow 1
    justify-content flex-end
  &_label
    padding 10px
    flex-grow 1
  &_content
    flex-grow 1
    text-align left
    padding 0 10px
    width calc(100% - 20px)

.create
  display flex
  flex-direction row-reverse
  position fixed
  bottom 5px
  right 5px
  z-index 900
  .tool_item
    margin 5px
</style>
