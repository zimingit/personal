<template>
  <div class="editor editor_wrapper">
    <!-- Инструменты -->
    <div class="editor_top_tools">
      <ColorPicker class="edit_tool_item" figure="hexagon" :color="note.color" @change="setColor"/>
      <div class="edit_tool_item settings" @click="toggleShowAdditional()">
        <icon name="settings" slot="icon" invert="0" size="normal"/>
      </div>
    </div>
    <!-- SideBar -->
    <AppSideBar :show="showAdditionalConfig">
      <div slot="content" class="additional_tools_wrapper">
        <TagInput :value="note.tags" decorator="#" @change="setTags"/>
      </div>
    </AppSideBar>
    <!-- Кнопки -->
    <div class="editor_bottom_tools">
      <NotesyLogo
        @click.native="close()"
        backgroundColor="#80CBC4"
        class="editor_bottom_button">
          <icon name="close" slot="icon" />
      </NotesyLogo>
      <NotesyLogo
        @click.native="save()"
        size="small"
        backgroundColor="#80CBC4"
        class="editor_bottom_button">
          <icon name="checked" slot="icon" />
      </NotesyLogo>
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

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.todo_list() }"
          @click="commands.todo_list"
        >
          <icon name="checklist" />
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
      <div class="name" :class="error"><span>Название</span>
        <input v-model="note.name" placeholder=". . . . . .">
      </div>
      <div class="description">
        <span>Описание</span>
        <editor-content class="editor__content" :editor="editor" />
      </div>
    </div>
  </div>
</template>
<script>
import TagInput from '../TagInput'
import ColorPicker from '../ColorPicker'
import AppSideBar from '@/components/AppSideBar'
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
/**
 * note = {
    date,
    description,
    name,
    user,
    color,
    tags: ['tags']
  }
 */
export default {
  name: 'NotesyEditor',
  props: {
    note: {
      type: Object
    }
  },
  data () {
    return {
      showAdditionalConfig: false,
      error: '',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem({
            nested: true
          }),
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
  created () {
    this.editor.setContent(this.note.description)
  },
  methods: {
    toggleShowAdditional () {
      this.showAdditionalConfig = !this.showAdditionalConfig
    },
    // ---- Методы установки доп.свойств ---- //
    setColor (color) {
      this.note.color = color
    },
    setTags (tags) {
      this.note.tags = tags
    },
    save () {
      if (this.note.name) {
        this.$emit('save', this.editor.getHTML())
        this.error = ''
      } else {
        this.error = 'name_error'
      }
    },
    close () {
      this.$emit('close')
    }
  },
  computed: {
  },
  components: {
    NotesyLogo,
    EditorContent,
    EditorMenuBar,
    Icon,
    ColorPicker,
    AppSideBar,
    TagInput
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
<style lang="stylus" scoped>
.editor_wrapper
  position fixed
  top 0
  left 0
  width 100vw
  height 100%
  z-index 10
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
  .additional_tools_wrapper
    padding 10px
    padding-top 50px
  .menubar
    padding-top 50px
    display flex
    flex-wrap wrap
    justify-content space-between
    button
      min-width 35px
      min-height 35px
      background #80CBC4
      border none
      margin 1.35%
      border none
      outline none
      cursor pointer
      color white
      text-align center
      padding 5px
      border-radius 4px
      transition border-radius .3s
      &:hover
        box-shadow 1px 1px 2px #009688
      &.is-active
        border-radius 50%
      @media (orientation: portrait)
        cursor default
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
      &.name_error
        span
          font-size 20px
          top -13px
          color #ea4335
          font-weight bold
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
        border-top 1px solid grey
        min-width calc(100% - 30px)
        max-width calc(100% - 30px)
        max-height calc(100vh - 198px)
        overflow-y auto
        text-align left
        padding 5px 15px 0 15px
        &::-webkit-scrollbar
          width 5px
          height 5px
        &::-webkit-scrollbar-track
          background transparent
        &::-webkit-scrollbar-thumb
          background #80CBC4
          border-radius 2.5px

.editor_bottom_tools
  display flex
  position absolute
  bottom 5px
  right 0
  z-index 3
  .editor_bottom_button
    margin-right 10px
.editor_top_tools
  position absolute
  top 5px
  right 0
  z-index 3
  display flex
  align-items center
  padding 0 10px 0 10px
  border-radius 20px 0 0 20px
  box-shadow -3px 1px 3px #E0E0E0
  height 40px
  .edit_tool_item
    margin-left 10px
    &.settings
      padding 2px
      border-radius 50%
      background #80cbc4
      cursor pointer
      @media (orientation: portrait)
        cursor default
</style>

<style lang="stylus">
ul[data-type="todo_list"]
  padding-left 15px
li[data-type="todo_item"]
  display flex
  align-items flex-start
  .todo-checkbox
    border 2px solid #80CBC4
    min-height 15px
    max-height 15px
    min-width 15px
    max-width 15px
    margin-right 10px
    user-select none
    cursor pointer
    border-radius .2em
    background-color transparent
    transition background .4s
    @media (orientation: portrait)
      cursor default
  .todo-content
    > p
      margin 0
      padding-bottom 15px

li[data-done="false"]
  text-decoration none

li[data-done="true"]
  > .todo-content
    > p
      text-decoration line-through
  > .todo-checkbox
    background-color #80CBC4

pre
  background #80CBC4
  padding 10px
  color white
  font-size 1.2em
  border-radius 3px
  overflow auto

blockquote
  border-left 3px solid rgba(0,0,0,.1)
  padding-left .8rem
  font-style italic

.editor__content
  p
    code
      display inline-block
      padding .2rem .4rem
      border-radius 5px
      font-weight 600
      background rgba(0,0,0,.1)
      color rgba(0,0,0,.8)
</style>
