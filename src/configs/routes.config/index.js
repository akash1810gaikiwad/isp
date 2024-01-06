import React from 'react'
import authRoute from './authRoute'
import masterRoute from './masterRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    ...masterRoute,
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
]
