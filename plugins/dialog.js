import Vue from 'vue'
import ComponentTemplate from '@/components/common/dialog.vue'

const constructor = Vue.extend(ComponentTemplate)
const dialog = (props) => {
  const instance = new constructor()
  instance.$data.title = props.title
  instance.$data.text = props.text
  instance.$data.type = props.type
  if (props.success) {
    instance.$data.success = props.success
  }
  if (props.cancel) {
    instance.$data.cancel = props.cancel
  }
  instance.$data.eventClick = props.click
  instance.vm = instance.$mount()
  document.body.insertBefore(instance.vm.$el, document.body.firstChild)
}

Vue.prototype.$dialog = dialog
