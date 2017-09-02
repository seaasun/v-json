<template>
  <div id="app">
    <Json v-model="data" :schemas ="schemas" >
    </Json>

    <hr>
    <textarea v-model="d">
    </textarea>
    {{data}}
  </div>
</template>

<script>
import Json from './jsons/Json.vue'
import schemas from './jsons/schemas'

let data = {
  str: 'str',
  number: 1,
  arr1: [1, 1, 3],
  obj: {
    str2: 'str2'
  }
}
data = { str: [1] }

export default {
  name: 'app',
  data () {
    return {
      data: data,
      schemas: schemas.test
    }
  },
  components: {
    Json
  },
  computed: {
    d: {
      get () {
        return JSON.stringify(this.data, null, 4)
      },
      set (value) {
        try {
          this.data = JSON.parse(value)
        } catch (e) {
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
