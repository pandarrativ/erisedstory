import {createRouter, createWebHashHistory} from 'vue-router'
import ImageGenerationPage from "../views/ImageGenerationPage.vue";
import ReviewPage from "../views/ReviewPage.vue";
import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";
import ConversationalAgent from "../views/ConversationalAgent.vue";
import DescriptionPage from "../views/DescriptionPage.vue";
import ModifyPage from "@/views/ModifyPage";

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/ImageGenerationPage',
        name: 'ImageGenerationPage',
        component: ImageGenerationPage
    },
    {
        path: '/ConversationalAgent',
        name: 'ConversationalAgent',
        component: ConversationalAgent
    },
    {
        path: '/ReviewPage',
        name: 'ReviewPage',
        component: ReviewPage
    },
    {
        path: '/DescriptionPage',
        name: 'DescriptionPage',
        component: DescriptionPage
    },
    {
        path: '/ModifyPage',
        name: 'ModifyPage',
        component: ModifyPage
    }
    ]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
