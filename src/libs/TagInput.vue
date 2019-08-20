<template>
  <transition-group name="item-list" tag="div" class="component_layout">
      <div v-for="(tag, index) in tags" :key="tag" class="tag" @click="tagClicked(tag)">
        {{decorator}}{{tag}}
        <button v-if="editable" @click="remove(tag, index)"></button>
      </div>
    <input v-if="editable" key="input" class="content_input" placeholder="new tag..." @change="add"/>
  </transition-group>
</template>
<script>
export default {
  name: 'AppTagInput',
  props: {
    value: {
      type: Array,
      required: true
    },
    decorator: {
      type: String
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tags: this.value
    }
  },
  watch: {
    tags (to, fr) {
      this.$emit('change', to)
    },
    value (to, fr) {
      this.tags = to
    }
  },
  methods: {
    add (e) {
      if (!e.target.value) return
      let value = e.target.value
      if (this.tags.indexOf(value) < 0) {
        this.tags.push(value)
        e.target.value = ''
      }
    },
    remove (value, index) {
      this.tags.splice(index, 1)
    },
    tagClicked (tag) {
      this.$emit('select', tag)
    }
  },
  computed: {
  }
}
</script>
<style lang="stylus" scoped>
.component_layout
  display flex
  flex-wrap wrap
  .tag
    display flex
    align-items center
    padding 2px 5px
    margin 3px
    border-radius 7px
    background #80cbc4
    font-size 14px
    color white
    button
      outline none
      border none
      flex-shrink 1
      margin-left 5px
      width 15px
      height 15px
      border-radius 50%
      color white
      background white
      background-image url('../assets/icons/close_colored.svg')
      background-size 8px
      background-position center
      background-repeat no-repeat
      padding 3px
      cursor pointer

.content_input
  outline none
  border none
  border-bottom 1px solid blue
  margin 3px
  width 100px
  min-width 100px
</style>
