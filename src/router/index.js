import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add',
      name: 'AddSmoothie',
      component: AddSmoothie
    },
    {
      path: '/edit/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie
    }
  ]
})
