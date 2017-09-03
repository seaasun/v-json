<template>
  <div>
    <!--撤销和还原测试-->
    <!--<div>-->
      <!--<span @click ="undo">undo</span>-->
      <!--<span @click ="redo">redo</span>-->
    <!--</div>-->
    <v-item :tree= 'tree'
            :schemas= 'schemas'
            :index="0"
            :deep="1">
    </v-item>
    <!--<div @click="change">refresh</div>-->
    <div style="display: none">{{mid}}</div>
    <!-- TODO：这并不是一个好方法，需要改-->
    <!-- test -->

  </div>
</template>

<script>
  import Item from './Item.vue'
  import utils from './utils'
  import _ from 'lodash'

  export default {
    name: 'json',
    props: {
      'value': {
        default: {} // json格式
      },
      'schemas': {
        default: {} // 支配json的格式
      },
      'name': {
        default: 'root' // 根的名称
      }
    },
    data () {
      return {
        historyJsons: [], // 历史存档
        undoIndex: 1, // 历史存到位置，倒序
        isUndo: false, // 是否为回滚操作
        tree: {}, // 被解析的json
        state: utils.state
      }
    },
    components: {
      'v-item': Item
    },
    created () {
      // 初始化tree
      let tree = utils.parse(this.value, this.name) || false
      if (tree !== false) {
        this.tree = tree
      }
    },
    watch: {
      // value改变时更新tree
      value (value) {
        if (this.state.errorNameUids.length === 0) { // 无重名时可更新
          let tree = utils.parse(value, this.name)
          this.tree = tree
        }
      }
    },
    computed: {
      // 当tree改变时更新value
      mid () {
        let value
        try { // value 有时不是合法的json
          value = utils.stringify(this.tree)
        } catch (e) {
          value = this.value
        }
        if (_.isEqual(value, this.value)) { // 避免value改变时再更新value
          return this.value
        } else {
          this.$emit('input', value)
          return value
        }
      }
    },
    methods: {
      // 自动保存副本
      save () {
        // 写入栈,作为回滚记录
        if (this.isUndo) {
          this.isUndo = false
          this.undoIndex += 1 // undo 的操作也会被记录，所以增加一索引
        } else {
          this.historyJsons.push(JSON.parse(JSON.stringify(this.tree)))
          this.undoIndex = 1
        }
        // 最大100个记录
        if (this.historyJsons.length > 100) {
          this.hitoryJsons.shift()
        }
      },
      // 撤销
      undo () {
        let length = this.historyJsons.length
        if (length - this.undoIndex <= 0) return // 避免过度撤销

        let tree = this.historyJsons[length - this.undoIndex - 1]
        this.tree = JSON.parse(JSON.stringify(tree))
        this.undoIndex += 1
        this.isUndo = true
      },
      // 还原
      redo () {
        let length = this.historyJsons.length

        if (this.undoIndex <= 1) return // 避免过渡撤销
        this.undoIndex -= 1
        let tree = this.historyJsons[length - this.undoIndex]
        this.tree = JSON.parse(JSON.stringify(tree))
        this.isUndo = true
      }
    }
  }
</script>

<style>

</style>
