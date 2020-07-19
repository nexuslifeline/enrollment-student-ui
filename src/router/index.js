import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const Application = () => import('@/views/pages/Application')
const Admission = () => import('@/views/pages/Admission')
const Billing = () => import('@/views/pages/Billing')
const Grade = () => import('@/views/pages/Grade')
const Profile = () => import('@/views/pages/Profile')
const Payment = () => import('@/views/pages/Payment')

const DemoComponents = () => import('@/views/pages/DemoComponents')


Vue.use(Router)

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
export default router
router.beforeEach((to, from, next) => {

  // check if the route requires authentication and user is not logged in
  if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
    // redirect to login page
    next({ name: 'Login' })
    return
  }

// if logged in redirect to dashboard
  if(to.path === '/login' && store.state.isLoggedIn) {
      next({name: from.name})
      return
  }

next()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {requiresAuth: true}
        },
        {
          path: 'application',
          name: 'Application',
          component: Application,
          meta: {requiresAuth: true}
        },
        {
          path: 'admission',
          name: 'Admission',
          component: Admission,
          meta: {requiresAuth: true}
        },
        {
          path: 'billing',
          name: 'Billing',
          component: Billing,
          meta: {requiresAuth: true}
        },
        {
          path: 'grade',
          name: 'Grade',
          component: Grade,
          meta: {requiresAuth: true}
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          meta: {requiresAuth: true}
        },
        {
          path: 'payment',
          name: 'Payment',
          component: Payment,
          meta: {requiresAuth: true}
        },
      ]
    },
    {
      path: '/500',
      name: 'Page500',
      component: Page500
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register/:studentCategoryId/:isEnrolled',
      name: 'Register',
      component: Register,
    },
    {
      path: '/demo',
      name: 'Demo',
      component: DemoComponents
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    },
  ]
}