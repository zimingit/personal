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
      <NotesyLogo v-if="showEditor"
        @click.native="closeEditor()"
        size="small"
        backgroundColor="#80CBC4"
        labelColor="white"
        class="tool_item">
          <icon name="checked" slot="icon" />
      </NotesyLogo>
      <NotesyLogo v-if="showEditor"
        @click.native="closeEditorWithoutSave()"
        backgroundColor="#80CBC4"
        labelColor="white"
        class="tool_item">
          <icon name="close" slot="icon" />
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
        <div v-for="note in day.notes"
             class="note"
             :style="{'border-left': note.color? `5px solid ${note.color}` : ''}"
             :key="note.id">
          <h2>{{note.name}}</h2>
          <div v-html="note.description"></div>
          <p>{{note.tags.join(', ')}}</p>
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
  <div class="editor editor_wrapper" v-if="showEditor">
    <div class="note_statuses">
      <ColorPicker figure="circle" @change="setColor"/>
    </div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">

        <button title="bold"
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button title="italic"
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button title="strike"
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strike" />
        </button>

        <button title="underline"
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />
        </button>

        <button title="code"
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </button>

        <button title="paragraph"
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <icon name="paragraph" />
        </button>

        <button title="H1"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <span>H1</span>
        </button>

        <button title="H2"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <span>H2</span>
        </button>

        <button title="H3"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <span>H3</span>
        </button>

        <button title="bullet list"
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="ul" />
        </button>

        <button title="ordered list"
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="ol" />
        </button>

        <button title="blockquote"
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote" />
        </button>

        <button title="code block"
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <icon name="code" />
        </button>

        <button title="hr"
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <icon name="hr" />
        </button>

        <button title="undo"
          class="menubar__button"
          @click="commands.undo"
        >
          <icon name="undo" />
        </button>

        <button title="redo"
          class="menubar__button"
          @click="commands.redo"
        >
          <icon name="redo" />
        </button>

      </div>
    </editor-menu-bar>
    <div class="edit_fields">
      <div class="name"><span>Название</span>
        <input v-model="noteToEdit.name" placeholder=". . . . . .">
      </div>
      <!-- <p class="tags"><span>Теги:</span><input v-model="noteToEdit.tags"></p> -->
      <div class="description">
        <span>Описание</span>
        <editor-content class="editor__content" :editor="editor" />
      </div>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
import NotesyLogo from './NotesyLogo'
import ColorPicker from '../ColorPicker'
import Icon from '../Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
export default {
  name: 'Notesy',
  props: ['userName'],
  data () {
    return {
      user: this.userName || '',
      notes: [],
      sure: {},
      showEditor: false,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: ''
      })
    }
  },
  firestore () {
    return {
      notes: this.$db.collection('notes').where('user', '==', this.user).orderBy('date')
    }
  },
  components: {
    NotesyLogo,
    EditorContent,
    EditorMenuBar,
    Icon,
    ColorPicker
  },
  created () {
    // Если пришли с user'ом и в localStorage сохранен user и они отличаются, то перезаписываем ls
    if (this.user && localStorage.user && this.user !== localStorage.user) {
      localStorage.user = this.user
    }
  },
  methods: {
    editNote (note) {
      this.editor.setContent(note.description)
      this.noteToEdit = note
      this.showEditor = true
    },
    create (noteToSave) {
      noteToSave.user = this.user
      this.$db.collection('notes')
        .add(noteToSave)
        .then(() => {
          console.log('note created!')
        })
    },
    update (note) {
      this.$db.collection('notes')
        .doc(note.id)
        .set(note)
        .then(() => {
          console.log('note updated!')
        })
    },
    remove (note) {
      this.$db.collection('notes')
        .doc(note.id)
        .delete()
    },
    toggleSure (note) {
      this.$set(this.sure, note.id, true)
      setTimeout(_ => { this.sure[note.id] = false }, 2000)
    },
    showEditorDialog () {
      let note = {
        date: new Date(),
        description: 'Описание задачи',
        name: '',
        user: '',
        color: '',
        tags: ['tags']
      }
      this.editNote(note)
    },
    closeEditor () {
      this.showEditor = false
      if (this.noteToEdit !== {}) {
        this.noteToEdit.description = this.editor.getHTML()
        const currentNote = this.notes.find(note => note.id === this.noteToEdit.id)
        if (currentNote) {
          this.update(currentNote)
        } else {
          this.create(this.noteToEdit)
        }
        this.noteToEdit = {}
      }
    },
    closeEditorWithoutSave () {
      this.showEditor = false
    },
    getDateFromTimestamp (date) {
      let joiner = []
      date = date.toDate()
      joiner.push(date.getDate())
      joiner.push(date.getMonth())
      joiner.push(date.getFullYear())
      return joiner.join('.')
    },
    // ---- Методы установки доп.свойств ---- //
    setColor (color) {
      this.noteToEdit.color = color
    }
  },
  computed: {
    noteByDatesComputed () {
      let notesByDate = {}
      const getDate = (date) => this.getDateFromTimestamp(date)
      this.notes.forEach(note => {
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
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
<style lang="stylus" scoped>
.dates_container
  display flex
  flex-direction column
  justify-content flex-start
  margin-bottom 20px
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
.note
  position relative
  display flex
  flex-direction column
  min-width 30%
  flex-grow 1
  max-width 100%
  max-height 50vh
  overflow-y hidden
  margin 5px
  padding-bottom 30px
  // border-bottom 1px dotted #80cbc4
  box-shadow: -1px 2px 5px #80cbc44f;
  @media (orientation: portrait)
    min-width 95%
    max-width 95%
  &:hover
    max-height none
    .toolbar_container
      opacity 1
      transform scale(1)
  h2
    padding 10px
  .toolbar_container
    position absolute
    display flex
    flex-direction column-reverse
    bottom 5px
    right 5px
    opacity 0
    transform scale(0)
    transform-origin right
    transition opacity .5s, transform .3s
    .tool
      margin 2px
.create
  display flex
  flex-direction row-reverse
  position fixed
  bottom 5px
  right 5px
  z-index 900
  .tool_item
    margin 5px

.editor_wrapper
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  z-index 10
  .note_statuses
    position absolute
    top 10px
    right 10px
  &:before
    content ''
    position absolute
    height 100vh
    width 100vw
    background white
    right 0
    top 0
    z-index -1
    pointer-events none
  .menubar
    padding-top 50px
    button
      min-width 35px
      min-height 35px
      background #80CBC4
      border none
      margin 5px
      border none
      outline none
      cursor pointer
      color white
      text-align center
      padding 5px
      border-radius 4px
      &:hover
        box-shadow 1px 1px 2px #009688
  .edit_fields
    display flex
    flex-direction column
    align-items flex-start
    .name
      position relative
      margin-top 10px
      width 100%
      span
        position absolute
        background white
        padding 0 5px
        font-size 15px
        top -10px
        left 10px
      input
        font-size 18px
        outline none
        color #616161
        border-top .5px solid grey
        border-left none
        border-right none
        border-bottom .5px solid grey
        padding 10px 15px
        min-width 100%
        &:focus
          border-bottom 1px solid #80CBC4
    .description
      position relative
      margin-top 20px
      width 100%
      span
        position absolute
        z-index 1
        border-radius 3px
        background white
        padding 0 5px
        font-size 15px
        top -10px
        left 10px
      .editor__content
        border-top .5px solid grey
        min-width 100%
        max-height calc(100vh - 198px)
        overflow-y auto
        &::-webkit-scrollbar
          width 5px
          height 5px
        &::-webkit-scrollbar-track
          background transparent
        &::-webkit-scrollbar-thumb
          background #80CBC4
          border-radius 2.5px

</style>
