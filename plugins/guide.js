import Vue from 'vue'
import ComponentTemplate from '@/components/common/guide.vue'

const constructor = Vue.extend(ComponentTemplate)
const guide = (props) => {
  const instance = new constructor()
  instance.$data.el = props.el
  instance.$data.title = props.title
  instance.$data.text = props.text
  instance.$data.color = props.color
  instance.$data.eventClick = props.click
  instance.vm = instance.$mount()
  document.body.insertBefore(instance.vm.$el, document.body.firstChild)
}

Vue.prototype.$guide = guide
