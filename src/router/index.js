import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
import MainWindow from "@/views/MainWindow.vue";

const routes = [

    {
        path: '/hello',
        name: 'hello',
        component: HelloWorld
    },
    {
        path: '/home',
        name: 'home',
        component: MainWindow

    }



]




const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router