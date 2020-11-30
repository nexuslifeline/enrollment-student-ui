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
const MyStatements = () => import('@/views/pages/my-statements/MyStatements')
const MyGrades = () => import('@/views/pages/MyGrades')
const MyProfile = () => import('@/views/pages/MyProfile')
const MyPayments = () => import('@/views/pages/MyPayments')
const MyApplications = () => import('@/views/pages/MyApplications')
const MyRequirements = () => import('@/views/pages/MyRequirements')
const MyScheduleList = () => import('@/views/pages/my-schedules/MyScheduleList')
const MySchedule = () => import('@/views/pages/my-schedules/MySchedule')
const MyDocuments = () => import('@/views/pages/my-documents/MyDocuments')
const AssessmentList = () => import('@/views/pages/my-documents/AssessmentList')
const RegistrationList = () => import('@/views/pages/my-documents/RegistrationList')
const Menu404 = () => import('@/views/pages/Menu404')
const Payment = () => import('@/views/pages/my-payments/Payment')

const DemoComponents = () => import('@/views/pages/DemoComponents')
const ApplicationNotice = () => import('@/views/pages/ApplicationNotice')

const ApplicationEntry = () => import('@/views/pages/my-applications/ApplicationEntry')
const ApplicationList = () => import('@/views/pages/my-applications/ApplicationList')


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
          path: 'application-notice',
          name: 'ApplicationNotice',
          component: ApplicationNotice,
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
          path: 'statements',
          name: 'MyStatements',
          component: MyStatements,
          meta: {requiresAuth: true}
        },
        {
          path: 'grades',
          name: 'MyGrades',
          component: MyGrades,
          meta: {requiresAuth: true}
        },
        {
          path: 'profile',
          name: 'MyProfile',
          component: MyProfile,
          meta: {requiresAuth: true}
        },
        {
          path: 'payments',
          name: 'MyPayments',
          component: MyPayments,
          meta: {requiresAuth: true}
        },
        {
          path: '/applications',
          component: { render(c) { return c('router-view') } },
          meta: {requiresAuth: true},
          children: [
            {
              path: '/',
              redirect: 'application-list',
            },
            {
              path: 'application-list',
              component: ApplicationList
            },
            {
              path: '/new',
              component: ApplicationEntry
            },
            {
              path: ':applicationId',
              component: ApplicationEntry
            },
          ]
        },
        {
          path: 'requirements',
          name: 'MyRequirements',
          component: MyRequirements,
          meta: {requiresAuth: true}
        },
        {
          path: '/schedules',
          component: { render(c) { return c('router-view') } },
          meta: {requiresAuth: true},
          children: [
            {
              path: '/',
              redirect: 'history',
            },
            {
              path: 'history',
              component: MyScheduleList
            },
            {
              path: ':academicRecordId',
              component: MySchedule
            },
          ]
        },
        {
          path: '/documents',
          name: 'MyDocuments',
          component: MyDocuments,
          meta: {requiresAuth: true},
          children: [
            {
              path: '/',
              redirect: 'assessment-list',
            },
            {
              path: 'assessment-list',
              component: AssessmentList
            },
            {
              path: 'registration-list',
              component: RegistrationList
            }
          ]
        },
        {
          path: '/payment/:billingId',
          name: 'Payment',
          component: Payment,
          meta: {requiresAuth: true},
        },
        {
          path: 'menu404',
          name: 'Menu404',
          component: Menu404,
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