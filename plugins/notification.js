import Vue from 'vue'
import ComponentTemplate from '@/components/common/notification.vue'

const constructor = Vue.extend(ComponentTemplate)
const notification = (props) => {
  const instance = new constructor()
  instance.$data.title = props.title
  instance.$data.text = props.text
  instance.$data.color = props.color
  instance.$data.tono = props.tono
  instance.$data.eventClick = props.click
  instance.vm = instance.$mount()
  document.body.insertBefore(instance.vm.$el, document.body.firstChild)
}

Vue.prototype.$notification = notification
