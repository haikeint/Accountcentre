const route = [
    {
        path: '/',
        component: () => import('@/components/Layout/AccountLayout.vue'),
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/Account/HomeView.vue')
            },
            {
                path: 'security',
                name: 'security',
                component: () => import('@/views/Account/SecurityView.vue')
            }
        ]
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/components/Layout/AuthAccount.vue'),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('@/views/AuthAccount/LoginView.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/AuthAccount/RegisterView.vue')
            },
            {
                path: 'forgetpassword',
                name: 'forgetpassword',
                component: () => import('@/views/AuthAccount/ForgetPassword.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/components/NotFound.vue')
    }
]

export default route
