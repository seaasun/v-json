# vue-json

> easy json

## Install
`$ npm install v-json --save`

## Example
```
<template>
  <Json v-model="json" :schemas ="schemas" name="root">
<template>

<script>
import Json form 'v-json'

export default {
  components: {
    Json
  },
  data: {
    json: {
     key: "hello world"
    },
    schemas: {}
  }
}

</script>
```


## Dev Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

对了。 easy es 那个项目我这几天有重构了下。https://seaasun.github.io/v-json/dist/。 这是一个demo，UI没好好弄，没作es查询语句，你先凑合看看


改进地方：
1. 界面. 你上次说别人不大会用。 所以界面按照chrome等json格式化的样子做。
2. 双向绑定。 在textarea中修改， json树会自动更新（原来的不可）。
3. 独立组件。 直接做成独立组件，方便复用，用法：<Json v-model="data" :schemas ="schemas" name="root"></Json>
