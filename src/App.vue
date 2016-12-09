<template>
  <div class="container">
    <div class="row">
      <div class="col s12 l6 offset-l3">
         <ul class="collapsible" data-collapsible="accordion">
          <li v-for="r in db" class="rows">
            <div class="collapsible-header">
              <span>{{r.Name}}</span>
              <a href="#" 
                 @click="removeItem(r)"
                 class="right remove-button">
                  <i class="material-icons">delete</i>
               </a>
            </div>
            <div class="collapsible-body" v-if="getChild(r).length">
              <p v-for="c in getChild(r)">{{c.Name}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import db from './db.json'
import Vue from 'vue'

export default {
  name: 'app',
  data(){
    return{
      db: db
    }
  },
  methods: {
    /**
     * Get childs of row
     * @param  {Object} row  Object of Item
     * @return {Array}     Child Array
     */
    getChild(row){
      let child = this.db.filter(r => r.parentID == row.ID)
      return child;
    },
    /**
     * Remove item with child item(s)
     * @param  {Object} row Object of Item
     * @return {Void}     
     */
    removeItem(row){
      let id = row.ID
      var tmp = this.db.filter(r => r.ID != id).filter(r => r.parentID != id )
      Vue.set(this,'db',tmp)
    }
  }

}
</script>

<style>
  .collapsible-header:hover .remove-button{
    display: block;
  }
  
  .remove-button{
    display: none;
  }

  @media screen and (max-width:768px) {
    .remove-button{
      display: block;
    }
  }
</style>