<template>
  <div class="container">
    <div class="row">
      <div class="col s12 l6 offset-l3">
        <ul class="collapsible" data-collapsible="accordion">
          <li v-for="row in store.state.list">
            <i class="material-icons" @click="store.removeItemWithChild(row)">delete</i>
            <div class="collapsible-header">
               {{row.Name}} - {{row.Phone}} / {{row.City}}
            </div>
            <div class="collapsible-body">
              <row v-for="m in getTree(row.ID)" :model="m"></row>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import store from './store'
import Vue from 'vue'

export default {
  name: 'app',
  data(){
    return{
      store: store
    }
  },
  methods: {
    /**
     * Get childs tree of row
     * @param  {Object} row  
     * @return {Array}  Tree Array
     */
    getTree(parent,arr){
      var out = []
      
      if (!arr) {
        arr = JSON.parse(JSON.stringify(this.store.state.list))
      }

      for(var i in arr) {
          if(arr[i].parentID == parent) {
              var children = this.getTree(arr[i].ID,arr)
              if(children.length) {
                  arr[i].children = children
              }
              out.push(arr[i])
          }
      }
      return out
    },
  }

}
</script>
<style>
  .collapsible .collapsible ,.collapsible .collapsible-body{
    margin: 0;
    margin-left: 14px;
    border:0!important;
  }
  li{
    position: relative;
    background-color: #ccc;
  }
  .collapsible-header{
    padding-left: 50px;
  }
  i{
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
  }
</style>