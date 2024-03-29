import {createRouter, createWebHistory} from 'vue-router'
import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Cart from "../pages/Cart.vue"
import Order from "../pages/Order.vue"
import Orders from "../pages/Orders.vue"

const routes = [
    {path:'/', component : Home},    // 경로가 / 일떄 Home 페이지로 매핑
    {path:'/login',component: Login},
    {path:'/cart',component: Cart},
    {path:'/order',component: Order},
    {path:'/orders', component: Orders}
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;