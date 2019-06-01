<template>
  <transition-group name="list" tag="div" class="content" id="content">
     <div v-for="(item, i) in items" :name="item.key" :key="item.key"
         draggable @dragover.prevent @dragleave.prevent @contextmenu.prevent
         :class="['drag-item', {'over': item.over}]"
         :style="{'background-color': item.color}"
         :data-index="i"

         @touchstart.self="setTouchDragStart($event, $event.target, {items, item, i, target})"
         @touchmove="setTouchDragEnter($event)"
         @touchend="setTouchDragEnd($event, $event.target)"
         @touchcancel="setTouchDragEnd($event, $event.target)"

         @dragstart.self="setDragStart($event, $event.target, {items, item, i, target})"
         @drop="setDrop($event, $event.target, {items, item, i, target})"
         @dragend="setDragEnd($event, $event.target, {items, item, i, target})"
         @dragenter="setDragEnter($event, $event.target, {items, item, i, target})">
         {{item.name}}
         <slot :name="item.key"></slot>
         <drag-drop @moved="() => $emit('moved')" :data="item.items" :target="'child_' + item.name" v-if="item.items"/>
     </div>
 </transition-group>
</template>
<script>
/* При touchstart создается дубль элемента внутри body и тянется за мышкой
во время движения проверяем mouseenter и меняем цель для перемещения
При touchEnd элемент уничтожается */
const itemList = [
  { key: 'item1', name: 'Abstract Block', over: false, color: '#4285f4' },
  { key: 'item2', name: 'Abstract Block', over: false, color: '#34a853' },
  { key: 'item3', name: 'Abstract Block', over: false, color: '#fbbc05' },
  { key: 'item4', name: 'Abstract Block', over: false, color: '#ea4335' },
  { key: 'item5', name: 'Abstract Block', over: false, color: '#00bcd4' }
]
export default {
  name: 'DragDrop',
  data () {
    return {
      items: itemList,
      target: 'Abstract',
      transfer: {},
      itemToPaste: {},
      cloneTarget: {}
    }
  },
  methods: {
    setTouchDragEnd (e, t) {
      document.getElementById('content').removeChild(this.cloneTarget)
      this.cloneTarget = {}
      this.setDrop(e, '', this.itemToPaste)
      t.style.opacity = '1'
      this.clearOver()
    },
    setTouchDragEnter (e) {
      let el = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      if (!el) return
      if (el.className && el.className === 'drag-item') {
        this.setDragEnter(e, el, { i: el.dataset.index })
        this.itemToPaste.i = el.dataset.index
        this.itemToPaste.items = this.items
      }
      let clone = this.cloneTarget
      this.cloneTarget.style.left = e.changedTouches[0].clientX - clone.clientWidth / 2 + 'px'
      this.cloneTarget.style.top = e.changedTouches[0].clientY - clone.clientHeight + 'px'
    },
    prepareClone (e, t) {
      let res = t.cloneNode(true)
      let evt = e.changedTouches[0]
      res.style.width = t.clientWidth - 40 + 'px'
      res.style.position = 'fixed'
      res.style.opacity = '.7'
      res.style.top = evt.clientY - t.clientHeight + 'px'
      res.style.left = evt.clientX - t.clientWidth / 2 + 'px'
      res.style.transition = 'all 0s'
      res.style.pointerEvents = 'none'
      return res
    },
    setTouchDragStart (e, t, data) {
      this.cloneTarget = this.prepareClone(e, t)
      document.getElementById('content').appendChild(this.cloneTarget)
      this.transfer = data
      t.style.opacity = '.5'
    },

    setDragStart (e, t, data) {
      t.style.opacity = '.5'
      this.transfer = data
    },
    setDragEnd (e, t, data) {
      t.style.opacity = '1'
      this.transfer = {}
      this.$emit('moved')
      this.clearOver()
    },
    setDrop (e, t, data) {
      this.paste(this.transfer.items, data.items, this.transfer.i, data.i, this.transfer.item)
    },
    setDragEnter (e, t, data) {
      this.clearOver()
      this.items[data.i].over = true
    },
    clearOver () {
      this.items.forEach(item => this.$set(item, 'over', false))
    },
    paste (arrayFrom, arrayTo, inFrom, inTo, data) {
      if (arrayFrom && arrayTo) {
        arrayFrom.splice(inFrom, 1)
        arrayTo.splice(inTo, 0, data)
      }
    }
  },
  components: {
    DragDrop: () => import('@/libs/DragDrop.vue')
  }
}
</script>
<style lang="stylus" scoped>
.content
  height 100%
  overflow auto
  display flex
  flex-direction column
  flex-basis 500px
  padding 50px
  .drag-item
    cursor pointer
    margin 20px
    padding 20px
    border-radius 30px
    transition all .5s
.over
  transform scale(.9)
.list-move
  transition transform .5s
</style>
