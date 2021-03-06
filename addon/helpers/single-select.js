import Ember from 'ember'
const {Helper, isArray} = Ember

/*
 * Returns false if one and only one item is in selectedItems
 * @param {Array} selectedItems
 * @see {@link https://github.com/emberjs/ember.js/issues/11867}
 * @returns {Boolean}
 */
export default Helper.extend({
  destroy () {
    if (this.teardown) this.teardown()
    this._super(...arguments)
  },
  setupRecompute (selectedItems, property) {
    if (this.teardown) this.teardown()
    var path = '@each.id'
    selectedItems.addObserver(path, this, this.recompute)
    this.teardown = () => {
      selectedItems.removeObserver(path, this, this.recompute)
    }
  },
  compute ([selectedItems, property]) {
    this.setupRecompute(selectedItems, property)
    return isArray(selectedItems) && selectedItems.length !== 1
  }
})
