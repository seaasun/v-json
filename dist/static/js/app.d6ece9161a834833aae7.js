webpackJsonp([1],[,,,,function(e,t,n){"use strict";var i=n(18),a=n.n(i),s=n(5),r=n.n(s),o=n(17),u=n.n(o);t.a={_object:{id:""},state:{showOptionUid:0},types:["any","auto","literal","array","object","bool","number","function","string"],updateShowOptionUid:function(e){this.state.showOptionUid=e},copy:function(e){return JSON.parse(r()(e))},parse:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];try{var i={};if(n=n?n+"."+t:t,u.a.isArray(e)){i={name:t,id:n,type:"array"},i.value=[];for(var a=0;a<e.length;a++)i.value.push(this.parse(e[a],a,n))}else if(u.a.isObject(e)){i={name:t,id:n,type:"object"},i.value=[];for(var s in e)i.value.push(this.parse(e[s],s,n))}else i={name:t,id:n,type:"auto",value:e};return i}catch(e){return!1}},formate:function(e){return r()(e,null,4)},stringify:function(e){var t={};try{var n=e.type||"string";if("array"===n){t=[];var i=!0,s=!1,r=void 0;try{for(var o,u=a()(e.value);!(i=(o=u.next()).done);i=!0){var d=o.value;t.push(this.stringify(d))}}catch(e){s=!0,r=e}finally{try{!i&&u.return&&u.return()}finally{if(s)throw r}}}else if("object"===n){t={};var c=!0,l=!1,p=void 0;try{for(var h,v=a()(e.value);!(c=(h=v.next()).done);c=!0){var m=h.value;t[m.name]=this.stringify(m)}}catch(e){l=!0,p=e}finally{try{!c&&v.return&&v.return()}finally{if(l)throw p}}}else if("string"===n)t=e.value;else try{t=JSON.parse(e.value)}catch(n){t=e.value}}catch(e){}return t}}},,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){function i(e){n(68)}var a=n(3)(n(33),n(77),i,null,null);e.exports=a.exports},,function(e,t,n){"use strict";t.a={test:[{name:"root",id:"root",showOption:!1,options:["addDic","addArray","addMany","addKv"],d:1},{name:"addKv",type:"string",id:"addKv",value:"ssss"},{name:"addDic",type:"object",id:"addDic",options:["addDic","addArray","addMany","addKv"]},{name:"addArray",id:"addArray",type:"array"},{name:"addMany",id:"addMany",type:"array",showOption:!0,options:["addDic","addArray","addMany"],value:[{name:"ss",value:"abc"},{name:"ss2",value:"abc2"}]}]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(30),a=n(29),s=n.n(a);i.a.config.productionTip=!1,new i.a({el:"#app",template:"<App/>",components:{App:s.a}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),a=n.n(i),s=n(76),r=n.n(s),o=n(31),u={str:"str",number:1,arr1:[1,1,3],obj:{str2:"str2"}};u={str:[1]},t.default={name:"app",data:function(){return{data:u,schemas:o.a.test}},components:{Json:r.a},computed:{d:{get:function(){return a()(this.data,null,4)},set:function(e){try{this.data=JSON.parse(e)}catch(e){}}}},methods:{}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(18),a=n.n(i),s=n(5),r=n.n(s),o=n(17),u=n.n(o),d=n(75),c=n.n(d),l=n(74),p=n.n(l),h=n(4);u.a.isIteration=function(e){return u.a.isArray(e)||u.a.isObject(e)},t.default={name:"v-item",props:["tree","schemas","index","parentId"],components:{ItemOption:c.a,ItemInput:p.a},data:function(){return{isSetHidden:!1,isJsonItem:!0,uid:u.a.uniqueId(),state:h.a.state}},created:function(){this.isSetHidden=this.isHidden||!1,this.schema.showOption&&this.showOption(),this.updateType()},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){this.updateType()},watch:{},computed:{isShowOption:function(){return this.uid===this.state.showOptionUid},computedName:function(){return"array"===this.$parent.tree.type?(this.tree.name=this.index,this.index):this.tree.name?this.tree.name:(this.tree.name=this.key,"key")},computedValue:function(){if("object"===this.tree.type)return"";if("array"===this.tree.type){return"Array["+(u.a.isArray(this.tree.value)?this.tree.value.length:"")+"]"}return"string"===this.tree.type?r()(this.tree.value):"function"===this.tree.type?this.tree.value():this.tree.value},nameEditable:function(){return"array"!==this.tree.type&&!(!1===this.tree.nameEditable)},valueEditable:function(){return!(!1===this.tree.valueEditable)},valueTypeClass:function(){var e=this.tree.type;return"string"===e?"vj-value-string":e in["object","array"]?"vj-value-object":"vj-value-literal"},computedOptions:function(){var e=this,t=[];return this.schema&&u.a.map(this.schema.options,function(n){var i=u.a.find(e.schemas,{id:n});i&&t.push(i)}),t},computedId:function(){if(this.isRoot())return["root"];var e=h.a.copy(this.parentId);return e.push(this.computedName),e},schema:function(){return u.a.find(this.schemas,{id:u.a.last(this.computedId)})||{}},isIteration:function(){return"object"===this.tree.type||"array"===this.tree.type},isNameUnique:function(){if("object"===this.$parent.tree.type&&u.a.isObject(this.$parent.tree.value)&&!this.isRoot()){var e=!0,t=!1,n=void 0;try{for(var i,s=a()(this.$parent.tree.value);!(e=(i=s.next()).done);e=!0){var r=i.value;if(r.isUniqueName&&r.name===this.tree.name&&r!==this.tree)return!1}}catch(e){t=!0,n=e}finally{try{!e&&s.return&&s.return()}finally{if(t)throw n}}}return this.$set(this.tree,"isUniqueName",!0),3}},methods:{toggleOption:function(){this.computedOptions.length>0?this.state.showOptionUid===this.uid?h.a.updateShowOptionUid(0):h.a.updateShowOptionUid(this.uid):this.addItem()},hideOption:function(){h.a.updateShowOptionUid(0)},addItem:function(e){var t=void 0;e||(e="$$string"),t="$$string"===e?{name:"key",type:"string",value:"value"}:"$$literal"===e?{name:"key",type:"number",value:"value"}:h.a.copy(u.a.find(this.schemas,{id:e})),u.a.isObject(this.tree.value)||this.$set(this.tree,"value",[]),"object"!==this.tree.type&&"array"!==this.tree.type&&this.updateType("object"),this.tree.value.push(t)},reduceItem:function(){this.$parent.tree.value.splice(this.index,1)},showReduce:function(){return!this.isReduce},toggleHide:function(){this.isSetHidden=!this.isSetHidden},setHidden:function(e){this.isSetHidden=e},isRoot:function(){return"v-item"!==this.$parent.$options._componentTag},updateType:function(e){if("auto"!==(e=e||"auto")&&-1!==u.a.indexOf(h.a.types,e))return void(this.tree.type=e);var t=this.tree.value||"";this.tree.type||this.$set(this.tree,"type","auto");var n=this.tree.type||"auto";return"auto"===n||-1===u.a.indexOf(h.a.types,n)?void(u.a.isFunction(t)?this.tree.type="function":u.a.isObject(t)?this.tree.type="object":u.a.isNumber(t)?this.tree.type="number":u.a.isBoolean(t)?this.tree.type="bool":u.a.isString(t)?this.tree.type="string":this.tree.type="literal"):void 0}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(4);t.default={name:"ItemInput",props:{value:{},tree:{},display:{default:function(){return this.value}},isName:{default:!1},editable:{default:!0}},data:function(){return{state:i.a.state,isFocus:!1}},computed:{computedValue:{get:function(){return this.value},set:function(e){this.$emit("input",e)}},valueTypeClass:function(){return this.isName?"vj-input-name":"array"===this.tree.type?"vj-input-normal":"string"===this.tree.type?"vj-input-string":"vj-input-literal"}},methods:{focus:function(){var e=this;this.editable&&(this.isFocus=!0,setTimeout(function(){return e.$el.children[1].focus()},0))},blur:function(){this.isFocus=!1}},watch:{"state.showOption":function(){}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(4);t.default={name:"ItemOption",props:["options"],data:function(){return{state:i.a.state}},methods:{addItem:function(e){e=e||"",this.$emit("addItem",e)}},watch:{"state.showOption":function(){}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),a=n.n(i),s=n(73),r=n.n(s),o=n(4),u=n(17),d=n.n(u);t.default={name:"json",props:["value","schemas"],data:function(){return{historyJsons:[],undoIndex:1,isTreeChange:!1,isValueChange:!0,isUndo:!1,tree:{}}},components:{"v-item":r.a},created:function(){var e=o.a.parse(this.value,"root");e.type="object",!1!==e&&(this.tree=e)},watch:{value:function(e){var t=o.a.parse(e,"root");t.type="object",this.tree=t,this.isValueChange=!0}},computed:{mid:function(){var e=void 0;try{e=o.a.stringify(this.tree)}catch(t){e=this.value}return d.a.isEqual(e,this.value)?this.value:(console.log("emit"),this.$emit("input",e),e)}},methods:{save:function(){this.isUndo?(this.isUndo=!1,this.undoIndex+=1):(this.historyJsons.push(JSON.parse(a()(this.tree))),this.undoIndex=1),this.historyJsons.length>100&&this.hitoryJsons.shift()},undo:function(){var e=this.historyJsons.length;if(!(e-this.undoIndex<=0)){var t=this.historyJsons[e-this.undoIndex-1];this.tree=JSON.parse(a()(t)),this.undoIndex+=1,this.isUndo=!0}},redo:function(){var e=this.historyJsons.length;if(!(this.undoIndex<=1)){this.undoIndex-=1;var t=this.historyJsons[e-this.undoIndex];this.tree=JSON.parse(a()(t)),this.isUndo=!0}}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){function i(e){n(71)}var a=n(3)(n(34),n(80),i,null,null);e.exports=a.exports},function(e,t,n){function i(e){n(70)}var a=n(3)(n(35),n(79),i,null,null);e.exports=a.exports},function(e,t,n){function i(e){n(72)}var a=n(3)(n(36),n(81),i,null,null);e.exports=a.exports},function(e,t,n){function i(e){n(69)}var a=n(3)(n(37),n(78),i,null,null);e.exports=a.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Json",{attrs:{schemas:e.schemas},model:{value:e.data,callback:function(t){e.data=t},expression:"data"}}),e._v(" "),n("hr"),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.d,expression:"d"}],domProps:{value:e.d},on:{input:function(t){t.target.composing||(e.d=t.target.value)}}}),e._v("\n  "+e._s(e.data)+"\n")],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("span",{on:{click:e.undo}},[e._v("undo")]),e._v(" "),n("span",{on:{click:e.redo}},[e._v("redo")])]),e._v(" "),n("v-item",{attrs:{tree:e.tree,schemas:e.schemas,index:0}}),e._v(" "),n("div",[e._v(e._s(e.mid))])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vj-input-block"},[n("span",{directives:[{name:"show",rawName:"v-show",value:!e.isFocus,expression:"!isFocus"}],staticClass:"vj-input-display",class:e.valueTypeClass,domProps:{textContent:e._s(e.display)},on:{click:function(t){t.stopPropagation(),e.focus(t)}}}),e._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:e.isFocus,expression:"isFocus"},{name:"model",rawName:"v-model",value:e.computedValue,expression:"computedValue"}],ref:"input",staticClass:"vj-input",attrs:{type:"text"},domProps:{value:e.computedValue},on:{blur:e.blur,input:function(t){t.target.composing||(e.computedValue=t.target.value)}}})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.isIteration?n("div",{staticClass:"vj-object"},[n("span",{on:{click:function(t){e.toggleHide()}}},[n("span",{directives:[{name:"show",rawName:"v-show",value:e.isSetHidden,expression:"isSetHidden"}],staticClass:"vj-hide-btn"},[e._v("\n        ►\n      ")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.isSetHidden,expression:"!isSetHidden"}],staticClass:"vj-show-btn"},[e._v("\n       ▼\n      ")])]),e._v(" "),n("item-input",{attrs:{display:e.computedName,tree:e.tree,isName:!0,editable:e.nameEditable},model:{value:e.tree.name,callback:function(t){e.tree.name=t},expression:"tree.name"}}),e._v(":\n      "),n("item-input",{attrs:{display:e.computedValue,tree:e.tree,isName:!0,editable:e.valueEditable},model:{value:e.tree.name,callback:function(t){e.tree.name=t},expression:"tree.name"}}),e._v(" "),n("span",{staticClass:"vj-add-btn",on:{click:function(t){e.toggleOption()}}},[e._v("\n        +\n        "),e.isShowOption?n("item-option",{attrs:{options:e.computedOptions},on:{addItem:e.addItem}}):e._e()],1),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:e.showReduce(),expression:"showReduce()"}],staticClass:"vj-reduce-btn",on:{click:function(t){e.reduceItem()}}},[e._v("\n      -\n    ")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.isSetHidden,expression:"!isSetHidden"}],staticClass:"vj-item-block"},e._l(e.tree.value,function(t,i){return n("div",{staticClass:"vj-item"},[n("v-item",{attrs:{tree:t,schemas:e.schemas,index:i,parentId:e.computedId}})],1)}))],1):n("div",{staticClass:"vj-item"},[n("item-input",{attrs:{display:e.computedName,tree:e.tree,isName:!0,editable:e.nameEditable},model:{value:e.tree.name,callback:function(t){e.tree.name=t},expression:"tree.name"}}),e._v(":\n    "),n("item-input",{attrs:{display:e.computedValue,tree:e.tree,isName:!1,editable:e.valueEditable},model:{value:e.tree.value,callback:function(t){e.tree.value=t},expression:"tree.value"}}),e._v(" "),n("span",{staticClass:"vj-add-btn",on:{click:function(t){e.addItem()}}},[e._v(" + ")]),e._v(" "),e.showReduce()?n("span",{staticClass:"vj-reduce-btn",on:{click:function(t){e.reduceItem()}}},[e._v("\n      - ")]):e._e()],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vj-option-block"},e._l(e.options,function(t){return n("div",{staticClass:"vj-option-name",on:{click:function(n){e.addItem(t.id)}}},[n("span",[e._v(e._s(t.name))])])}))},staticRenderFns:[]}}],[32]);
//# sourceMappingURL=app.d6ece9161a834833aae7.js.map