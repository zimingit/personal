<template>
<div>
  <div class="top">
    <h1> Notesy {{user}}</h1>
    <div class="create" @click="toggleEditor()">
    <NotesyLogo
      size="medium"
      :label="labelEditorComputed"
      backgroundColor="#80CBC4"
      labelColor="white"
      />
    </div>
  </div>
  <transition name="fade-scale-up">
  <div class="dates_container" v-if="!showEditor">
    <div class="date" v-for="day in noteByDatesComputed" :key="day.date.seconds">
      <div class="date_label_container">
        <h3>{{day.date}}</h3>
      </div>
      <div class="notes_container">
        <div class="note" v-for="(note, i) in day.notes" :key="note.name + i + day.date.seconds">
          <p>{{note.name}}</p>
          <div v-html="note.description"></div>
          <p>{{note.tags.join(', ')}}</p>
          <div class="toolbar_container">
            <div v-if="!sure[note.id]" class="tool note_remove" @click="toggleSure(note)">
              <NotesyLogo size="small" label="Delete" backgroundColor="#80CBC4" labelColor="white"/>
            </div>
            <div v-else class="tool note_remove" @click="remove(note)">
              <NotesyLogo size="small" label="Sure?" backgroundColor="#ff5722" labelColor="white"/>
            </div>
            <div class="tool note_edit" @click="editNote(note)">
              <NotesyLogo size="small" label="Edit" backgroundColor="#80CBC4" labelColor="white"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
  <transition name="fade-scale-down" tag="div" class="editor_wrapper">
  <div class="editor editor_wrapper" v-if="showEditor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
        bold
          <icon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
        italic
          <icon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
        strike
          <icon name="strike" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
        underline
          <icon name="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
        code
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
        paragraph
          <icon name="paragraph" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
        bullet list
          <icon name="ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
        ordered list
          <icon name="ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
        blockquote
          <icon name="quote" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
        code block
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
        hr
          <icon name="hr" />
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
        undo
          <icon name="undo" />
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
        redo
          <icon name="redo" />
        </button>

      </div>
    </editor-menu-bar>
    <div>
      <p>Название:<span><input v-model="noteToEdit.name"></span></p>
      <p>Теги:<span><input v-model="noteToEdit.tags"></span></p>
      <p>Описание:<span>
        <editor-content class="editor__content" :editor="editor" />
      </span>
      </p>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
import NotesyLogo from './NotesyLogo'
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
    Icon
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
    toggleEditor () {
      if (this.showEditor) {
        this.closeEditor()
      } else {
        this.showEditorDialog()
      }
    },
    showEditorDialog () {
      let note = {
        date: new Date(),
        description: 'Описание задачи',
        name: 'Название',
        user: '',
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
    getDateFromTimestamp (date) {
      let joiner = []
      date = date.toDate()
      joiner.push(date.getDate())
      joiner.push(date.getMonth())
      joiner.push(date.getFullYear())
      return joiner.join('.')
    }
  },
  computed: {
    labelEditorComputed () {
      let text = 'Create'
      if (this.showEditor) {
        text = 'Save'
      }
      return text
    },
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
  flex-wrap wrap
  justify-content flex-start
  margin-bottom 120px
  .date
    margin-left 15px
    position relative
    .date_label_container
      position absolute
      left -13px
      width 20px
      height calc(100% - 60px)
      top 0
      h3
        position sticky
        transform rotate(-90deg) translateX(-60px)
        top 40px
    .notes_container
      display flex
      flex-wrap wrap
      justify-content flex-start
.note
  position relative
  display flex
  flex-direction column
  min-width 32%
  max-width 98%
  margin 5px
  padding-bottom 30px
  // border-bottom 1px dotted #80cbc4
  box-shadow: -1px 2px 5px #80cbc44f;
  @media (orientation: portrait)
    min-width 95%
    margin-left 2.5%
    margin-right 2.5%
  .toolbar_container
    position absolute
    display flex
    flex-direction column-reverse
    bottom 5px
    right 5px
    .tool
      margin 5px
.create
  position fixed
  bottom 10px
  right 10px
  z-index 900

.editor_wrapper
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  .menubar
    padding-top 50px
    button
      background #80CBC4
      border none
      margin 5px
      border none
      outline none
      font-weight bold
      color white
      text-align center
      padding 5px
      border-radius 4px
</style>
