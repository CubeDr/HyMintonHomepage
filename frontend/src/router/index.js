import Vue from 'vue'
import Router from 'vue-router'
import NoticePage from '../pages/NoticePage'
import EventPage from '../pages/EventPage'
import FeePage from '../pages/FeePage'
import ShuttlePage from '../pages/ShuttlePage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: NoticePage
    }, {
      path: '/notice',
      name: 'NoticePage',
      component: NoticePage
    }, {
      path: '/event',
      name: 'EventPage',
      component: EventPage
    }, {
      path: '/fee',
      name: 'FeePage',
      component: FeePage
    }, {
      path: '/shuttle',
      name: 'ShuttlePage',
      component: ShuttlePage
    }
  ]
})
