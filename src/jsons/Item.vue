<template>
  <div>
    <!-- object -->
    <div v-if= "isIteration" class= "vj-object">
      <span @click="toggleHide()">
        <!-- hide and show -->
        <span v-show = "isSetHidden" class="vj-hide-btn">
          &#9658;
        </span>
        <span v-show = "!isSetHidden"  class="vj-show-btn">
         &#9660;
        </span>
      </span>

        <!-- name and value -->
        <item-input v-model="tree.name"
                     :display="computedName"
                     :tree="tree"
                     :isName="true"
                     :editable="nameEditable">
        </item-input>:
        <item-input v-model="tree.name"
                     :display="computedValue"
                     :tree="tree"
                     :isName="true"
                     :editable="valueEditable">
        </item-input>


        <!-- option -->
        <span @click = "toggleOption()" class="vj-add-btn">
          +
          <item-option
            v-if = "isShowOption"
            :options="computedOptions" @addItem="addItem">
          </item-option>
        </span>

      <!--<span @click = "addItem()">+</span>-->
      <span v-show = "showReduce()" @click="reduceItem()" class="vj-reduce-btn">
        -
      </span>

      <!-- item -->
      <div v-show="!isSetHidden" class="vj-item-block">
        <div v-for = "(item, index) in tree.value"
          class="vj-item" >
          <v-item :tree= "item"
                  :schemas= 'schemas'
                  :index="index"
                  :parentId="computedId"
                  :deep="nextDeep">
          </v-item>
        </div>
      </div>
    </div>

    <!-- others -->
    <div v-else class="vj-item">

      <item-input v-model="tree.name"
                  :display="computedName"
                  :tree="tree"
                  :isName="true"
                  :editable="nameEditable">
      </item-input>:
      <item-input v-model="tree.value"
                  :display="computedValue"
                  :tree="tree"
                  :isName="false"
                  :editable="valueEditable"
                  >
      </item-input>

      <span @click="addItem()" class="vj-add-btn"> + </span>
      <span v-if = "showReduce()" @click="reduceItem()" class="vj-reduce-btn">
        - </span>
    </div>
    <div style="display: none">{{isNameUnique}}</div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import ItemOption from './ItemOption.vue'
  import ItemInput from './ItemInput.vue'
  import utils from './utils'

  _.isIteration = val => {
    return _.isArray(val) || _.isObject(val)
  }

  export default {
    name: 'v-item',
    props: [
      'tree', // 被解析的json
      'schemas',  // 控制json的配置
      'index',  // 父亲的第几个子元素，第一个为0
      'parentId', // 父Id
      'deep'], // 深度，第一层为0
    components: {
      ItemOption,
      ItemInput
    },
    data () {
      return {
        isSetHidden: false,
        isJsonItem: true,
        uid: _.uniqueId(),
        state: utils.state

      }
    },
    created () {
      this.isSetHidden = this.isHidden || false

      if (this.schema.showOption) {
        this.showOption()
      }
      this.updateType()
    },
    beforeMount () {
    },
    mounted () {
    },
    beforeUpdate () {
      this.updateType()
    },
    watch: {
    },
    computed: {
      isShowOption () {
        return this.uid === this.state.showOptionUid
      },
      computedName () {
        if (this.$parent.tree.type === 'array' && !this.isRoot) {
          this.tree.name = this.index
          return this.index
        } else if (this.tree.name) {
          return this.tree.name
        } else {
          this.tree.name = this.key
          return 'key'
        }
      },
      computedValue () {
        if (this.tree.type === 'object') {
          return ''
        } else if (this.tree.type === 'array') {
          let length = _.isArray(this.tree.value) ? this.tree.value.length : ''
          return 'Array[' + length + ']'
        } else if (this.tree.type === 'string') {
          return JSON.stringify(this.tree.value)
        } else if (this.tree.type === 'function') {
          return this.tree.value()
        } else {
          return this.tree.value
        }
      },
      nameEditable () {
        if (this.tree.type === 'array') {
          return false
        } else {
          return !(this.tree.nameEditable === false)
        }
      },
      valueEditable () {
        return !(this.tree.valueEditable === false)
      },
      valueTypeClass () {
        const type = this.tree.type
        if (type === 'string') {
          return 'vj-value-string'
        } else if (type in ['object', 'array']) {
          return 'vj-value-object'
        } else {
          return 'vj-value-literal'
        }
      },
      computedOptions () {
        let items = []
        if (this.schema) {
          _.map(this.schema.options, itemId => {
            let item = _.find(this.schemas, {id: itemId})
            if (item) items.push(item)
          })
        }
        return items
      },
      computedId () {
        if (this.isRoot) {
          return ['root']
        } else {
          let ids = utils.copy(this.parentId)
          ids.push(this.computedName)
          return ids
        }
      },
      schema () {
        return _.find(this.schemas, {id: _.last(this.computedId)}) || {}
      },
      isIteration () {
        return this.tree.type === 'object' || this.tree.type === 'array'
      },
      // 检测对象的key是否相同
      isNameUnique () {
        // 1. 判断父是object
        if (!this.isRoot && this.$parent.tree.type === 'object') {
          for (let item of this.$parent.tree.value) {
            // 判断为同名
            if (item.isUniqueName && item.name === this.tree.name && item !== this.tree) {
              utils.addErrorNameUid(this.uid) // 添加至全局错误
              // this.state.errorNameUids = [1]
              // this.state.errorNameUids.push(uid)
              return false
            }
          }
          utils.reduiceErrorNameUid(this.uid) // 从全局错误删除
          this.$set(this.tree, 'isUniqueName', true)
          return true
        }
      },
      nextDeep () {
        // 如果有子元素，子元素的深度
        return this.deep + 1
      },
      isRoot () {
        // 是否为根元素
        return this.deep === 1
      }
      // 是否为根元素
    },
    methods: {
      // 隐藏添加菜单
      toggleOption () {
        if (this.computedOptions.length > 0) {
          if (this.state.showOptionUid === this.uid) {
            utils.updateShowOptionUid(0)
          } else {
            utils.updateShowOptionUid(this.uid)
          }
        } else {
          this.addItem()
        }
      },
      // 显示添加菜单
      hideOption () {
        utils.updateShowOptionUid(0)
      },
      // 增加子
      addItem (key) {
        let item
        // 检查key 预设值
        if (!key) {
          key = '$$string'
        }
        if (key === '$$string') {
          item = {
            name: 'key',
            type: 'string',
            value: 'value'
          }
        } else if (key === '$$literal') {
          item = {
            name: 'key',
            type: 'number',
            value: 'value'
          }
        } else {
          item = utils.copy(_.find(this.schemas, {id: key}))
        }

        // 检查value
        if (!_.isObject(this.tree.value)) {
          this.$set(this.tree, 'value', [])
        }

        // 检查type
        if (this.tree.type !== 'object' && this.tree.type !== 'array') {
          this.updateType('object')
        }
        this.tree.value.push(item)
      },
      // 删除自己
      reduceItem () {
        this.$parent.tree.value.splice(this.index, 1)
      },
      // 显示删除按键
      showReduce () {
        return !this.isReduce
      },
      toggleHide () {
        this.isSetHidden = !this.isSetHidden
      },
      // 设置隐藏
      setHidden (val) {
        this.isSetHidden = val
      },
      // 更新组件的type
      updateType (forceType) {
        // 1. 强制修改type
        forceType = forceType || 'auto'
        if (forceType !== 'auto' && _.indexOf(utils.types, forceType) !== -1) {
          this.tree.type = forceType
          return
        }

        // 2. 初始化type和value
        const value = this.tree.value || ''
        if (!this.tree.type) {
          this.$set(this.tree, 'type', 'auto')
        }
        const type = this.tree.type || 'auto'

        // 3. 如果无type, 初始化type的值
        if (type === 'auto' || _.indexOf(utils.types, type) === -1) {
          if (_.isFunction(value)) {
            this.tree.type = 'function'
          } else if (_.isObject(value)) {
            this.tree.type = 'object'
          } else if (_.isNumber(value)) {
            this.tree.type = 'number'
          } else if (_.isBoolean(value)) {
            this.tree.type = 'bool'
          } else if (_.isString(value)) {
            this.tree.type = 'string'
          } else {
            this.tree.type = 'literal'
          }
          return
        }

        // 4.其他情况，保持type的类型
        return
      }
    }
  }
</script>

<style >
  body {
    font-size: 14px;
    font-family: Menlo, Consolas, monospace;
    line-height: 18px;
  }


  .vj-item-block{
    margin-left: 20px;
  }

  .vj-add-btn{
    margin-left: 7px;
    color: #999;
    position: relative;
  }
  .vj-reduce-btn{
    color: #999
  }
  .vj-object{

  }

</style>
