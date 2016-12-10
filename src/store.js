import db from './db.json'

var store = {
  debug: true,
  state: {
    list: db
  },
  removeItemWithChild (item) {
    let arr = this.state.list
    for(var i in this.state.list) {
      if (this.state.list[i].ID == item.ID) {
        var tmp = Object.assign({},this.state.list[i])
        this.state.list.splice(i,1)
        this.getChildNodes(tmp).map(c => this.removeItemWithChild(c))
      }
    }
  },
  getChildNodes(item){
    return this.state.list.filter(l => l.parentID == item.ID)
  }
}

export default store