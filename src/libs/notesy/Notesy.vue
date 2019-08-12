<template>
<div>
  <div class="top">
    <h1> Notesy {{user}}</h1>
    <div class="create" @click="closeEditor()">
    <NotesyLogo
      size="medium"
      :label="!showEditor? 'Edit': 'Save'"
      backgroundColor="#80CBC4"
      labelColor="white"
      />
    </div>
  </div>
  <transition name="fade-scale-up">
  <div class="notes" v-if="!showEditor">
    <div class="note" v-for="(note, i) in notes" :key="note.name + i" @contextmenu.prevent="remove(note)">
      <p>{{note.name}}</p>
      <div v-html="note.description"></div>
      <p>{{note.tags.join(', ')}}</p>
      <div class="note_edit" @click="editNote(note)">
        <NotesyLogo
          size="small"
          label="Edit"
          backgroundColor="#80CBC4"
          labelColor="white"
          />
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
      newNote: {
        date: new Date(),
        description: 'Тестовая запись в блокноте',
        name: 'Первая запись в блокнот',
        user: '',
        id: 0,
        tags: ['тег1', 'тег2']
      },
      noteToEdit: {},
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
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `
      })
    }
  },
  firestore () {
    return {
      notes: this.$db.collection('notes').where('user', '==', this.user).orderBy('id')
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
    closeEditor () {
      this.showEditor = false
      if (this.noteToEdit !== {}) {
        this.noteToEdit.description = this.editor.getHTML()
        this.update(this.notes.find(note => note.id === this.noteToEdit.id))
        this.noteToEdit = {}
      }
    },
    update (note) {
      this.$db.collection('notes')
        .doc(note.id)
        .set(note)
        .then(() => {
          console.log('note updated!')
        })
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
<style lang="stylus" scoped>
.notes
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
  border 1px solid black
  border-radius 5px
  @media (orientation: portrait)
    min-width 95%
    margin-left 2.5%
    margin-right 2.5%
  .note_edit
    position absolute
    bottom 5px
    right 5px
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
