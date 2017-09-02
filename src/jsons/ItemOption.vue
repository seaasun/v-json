<template>
  <div class="vj-option-block">
    <div v-for="item in options" @click="addItem(item.id)" class="vj-option-name">
          <span >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  import utils from './utils'
  export default {
    name: 'ItemOption',
    props: ['options'],
    data () {
      return {
        state: utils.state
      }
    },
    methods: {
      addItem (id) {
        id = id || ''
        this.$emit('addItem', id)
      }
    },
    watch: {
      'state.showOption' () {
      }
    }
  }
</script>

<style>
  .vj-option-block{
    display: block;
    position: absolute;
    background: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    margin: 14px;
    z-index: 1000;
    top: -14px;
    left: 0;
  }

  .vj-option-name{
    padding: 7px 14px;
    color: #000;
    font-size: 14px;
  }

</style>
