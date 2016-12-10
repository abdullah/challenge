<template>
    <ul class="collapsible" data-collapsible="accordion">
      <li>
        <i class="material-icons" @click="store.removeItemWithChild(model)">delete</i>
        <div class="collapsible-header" @click="toggle">
          {{model.Name}} - {{model.Phone}} / {{model.City}}      
        </div>
        <div class="collapsible-body" v-if="model.children">
          <div
            is="row"
            class="row"
            v-for="model in model.children"
            :model="model">
          </div>
        </div>
      </li>
    </ul>
</template>

<script>
  import store from 'src/store'

  export default {
    name: 'row',
    props: {
      model: Object
    },
    data: function () {
      return {
        open: false,
        store: store
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children &&
          this.model.children.length
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
    }
  }
</script>
