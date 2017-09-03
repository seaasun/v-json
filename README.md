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
