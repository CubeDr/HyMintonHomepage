import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../pages/MainPage'
import IndexPage from '../pages/IndexPage'
import NoticePage from '../pages/main/NoticePage'
import EventPage from '../pages/main/EventPage'
import FeePage from '../pages/main/FeePage'
import ShuttlePage from '../pages/main/ShuttlePage'
import LoginPage from '../pages/LoginPage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    }, {
      path: '/main',
      name: 'MainPage',
      component: MainPage,
      children: [
        {path: '/notice', name: 'NoticePage', component: NoticePage},
        {path: '/event', name: 'EventPage', component: EventPage},
        {path: '/fee', name: 'FeePage', component: FeePage},
        {path: '/shuttle', name: 'ShuttlePage', component: ShuttlePage}
      ]
    }, {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
