import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

//import  view
// import CustomerList from './view/customer/CustomerList.vue'
import EmployeeList from './view/employee/EmployeeList.vue'
//
Vue.use(VueRouter)

const routers = [
  //{ path: '/customer', component: CustomerList },
  {  path: '/employee', component: EmployeeList }
]
const router = new VueRouter({
  mode: 'history',
  routes :routers 
})
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
