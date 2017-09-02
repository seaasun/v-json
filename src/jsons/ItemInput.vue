<template>
  <div class="vj-input-block">
    <span v-show="!isFocus"
          @click.stop="focus"
          v-text="display"
          :class="valueTypeClass"
          class="vj-input-display"
      >

    </span>
    <input type="text"
           @blur="blur"
           v-show="isFocus"
           v-model="computedValue"
           class="vj-input"
           ref="input">
  </div>
</template>

<script>
  // import _ from 'lodash'
  import utils from './utils'

  export default {
    name: 'ItemInput',
    props: {
      value: {}, // input的value
      tree: {},
      display: {  // 一般显示的内容
        default () {
          return this.value
        }
      },
      isName: {   // 是name（key） or value
        default: false
      },
      editable: {  // 是否可编辑
        default: true
      }
    },
    data () {
      return {
        state: utils.state,
        isFocus: false
      }
    },
    computed: {
      // input 的vl
      computedValue: {
        get () {
          return this.value
        },
        set (newValue) {
          this.$emit('input', newValue)
        }
      },
      // 确定字体的颜色
      valueTypeClass () {
        if (this.isName) {
          return 'vj-input-name'
        }
        if (this.tree.type === 'array') {
          return 'vj-input-normal'
        }
        const type = this.tree.type
        if (type === 'string') {
          return 'vj-input-string'
        } else {
          return 'vj-input-literal'
        }
      }
    },
    methods: {
      // 单击后显示并聚焦input
      focus () {
        if (this.editable) {
          this.isFocus = true
          setTimeout(() => this.$el.children[1].focus(), 0)
        }
      },
      // 失去焦点后隐藏
      blur () {
        this.isFocus = false
      }
    },
    watch: {
      'state.showOption' () {
      }
    }
  }
</script>

<style>
.vj-input-display{
  min-width: 7px;
  display: inline-block;
}
.vj-input-block {
  display: inline-block;
}
.vj-input {
  width: 160px;
  border: 0;
  color: #444;
  background-color: #eee;
  outline:none;
  padding-left: 7px
}
.vj-input-literal{
  color: #0033cc
}
.vj-input-string{
  color: #c41a16
}
.vj-input-name{
  color:  #881391
}
.vj-input-normal{
  color: #444;
}

</style>
