import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
//import MainWindow from "@/views/MainWindow.vue";
import Note from '@/views/Note.vue'
import Chat from '@/views/Chat.vue'
import FConsultant from '@/views/FConsultant.vue'
import News from '@/views/News.vue'
import Profile from '@/views/Profile.vue'
import Authorization from "@/views/Authorization.vue";
import Registration from "@/views/Registration.vue";
import StartWindow from "@/views/StartWindow.vue";


const routes = [

    {
        path: '/hello',
        name: 'hello',
        component: HelloWorld
    },
    {
        path: '/home',
        name: 'home',
        component: StartWindow

    },
    {
        path: '/note',
        name: 'note',
        component: Note
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat
    },
    {
        path: '/fconsultant',
        name: 'fconsultant',
        component: FConsultant
    },
    {
        path: '/news',
        name: 'news',
        component: News
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/authorization',
        name: 'authorization',
        component: Authorization
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    }

]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router