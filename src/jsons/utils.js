/**
 * Created by seaasun on 2017/8/24.
 */
import _ from 'lodash'

export default {
  _object: {
    'id': ''
  },
  state: {
    showOptionUid: 0
  },
  // 支持的类别
  types: [
    'any', // 任何类型， 不作解析
    'auto', // 默认值, 经解析依次为 function,object,number,bool,string, literal
    'literal', // 可为 bool, arry, object, number, bool 和其他（如null)
    'array', // 可迭代数组
    'object', // 可迭代对象
    'bool', // bool
    'number', // 数字
    'function', // 直接执行的函数
    'string' // 字符串
  ],
  // 修改显示哪个组件的菜单
  updateShowOptionUid (id) {
    this.state.showOptionUid = id
  },
  // 深度copy
  copy (value) {
    return JSON.parse(JSON.stringify(value))
  },
  // 将json解析为组件可识别的tree
  parse (value, key, id = false) {
    try {
      let result = {}
      if (id) {
        id = id + '.' + key
      } else {
        id = key
      }
      // array
      if (_.isArray(value)) {
        result = {
          name: key,
          id: id,
          type: 'array'
        }
        result['value'] = []
        for (let i = 0; i < value.length; i++) {
          result['value'].push(this.parse(value[i], i, id))
        }
        // object
      } else if (_.isObject(value)) {
        result = {
          name: key,
          id: id,
          type: 'object'
        }
        result['value'] = []
        for (let v in value) {
          result['value'].push(this.parse(value[v], v, id))
        }
        // others
      } else {
        result = {
          name: key,
          id: id,
          type: 'auto',
          value: value
        }
      }
      return result
    } catch (e) {
      return false
    }
  },
  // 格式化输出json
  formate (json) {
    return JSON.stringify(json, null, 4)
  },
  // 将tree 解析为json
  stringify (tree) {
    let result = {}
    try {
      let type = tree.type || 'string'
      if (type === 'array') {
        result = []
        for (let item of tree.value) {
          result.push(this.stringify(item))
        }
      } else if (type === 'object') {
        result = {}
        for (let item of tree.value) {
          result[item.name] = this.stringify(item)
        }
      } else if (type === 'string') {
        result = tree.value
      } else {
        try {
          result = JSON.parse(tree.value)
        } catch (e) {
          result = tree.value
        }
      }
    } catch (e) {

    }
    return result
  }
}
