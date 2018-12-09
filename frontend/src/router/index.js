import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../pages/MainPage'
import IndexPage from '../pages/IndexPage'
import NoticePage from '../pages/main/NoticePage'
import EventPage from '../pages/main/EventPage'
import FeePage from '../pages/main/FeePage'
import ShuttlePage from '../pages/main/ShuttlePage'
import AdminPage from '../pages/main/AdminPage'
import LoginPage from '../pages/LoginPage'
import EventListPage from '../pages/event/EventListPage'
import EventCalendar from '../components/EventCalendar'
import FeeMainPage from '@/pages/fee/Main'
import FeeUserPage from '@/pages/fee/User'
import FeeMembersPage from '@/pages/fee/Members'
import FeeNPaysPage from '@/pages/fee/NPays'

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
        {
          path: '/event',
          component: EventPage,
          children: [
            {
              path: '/',
              name: 'EventPage',
              component: EventCalendar
            }, {
              path: 'list/:year/:month/:date',
              name: 'EventListPage',
              component: EventListPage
            }
          ]
        },
        {
          path: '/admin',
          name: 'AdminPage',
          component: AdminPage,
         
        },
        {
          path: '/fee',
          component: FeePage,
          children: [
            {
              path: '/',
              name: 'FeePage',
              component: FeeMainPage
            }, {
              path: '/user/:id',
              name: 'FeeUserPage',
              component: FeeUserPage
            }, {
              path: '/members',
              name: 'FeeMembersPage',
              component: FeeMembersPage
            }, {
              path: '/npays',
              name: 'FeeNPaysPage',
              component: FeeNPaysPage
            }
          ]
        },
        {path: '/shuttle', name: 'ShuttlePage', component: ShuttlePage}
      ]
    }, {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
