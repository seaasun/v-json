<template>
  <div id="app">
    <Json v-model="data" :schemas ="schemas" name="root">
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
data = [1]

export default {
  name: 'app',
  data () {
    return {
      data: data,
      schemas: schemas.test,
      isPeopleChange: false,
      value: {}
    }
  },
  components: {
    Json
  },
  computed: {
    d: {
      get () {
        let data = this.data
        if (!this.isPeopleChange) {
          console.log(111)
          return JSON.stringify(data, null, 4)
        } else {
          this.isPeopleChange = false
          return this.value
        }
      },
      set (value) {
        try {
          this.value = value
          this.isPeopleChange = true
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
