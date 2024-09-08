import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'gallerList',
        path: '/gallery',
        component: lazy(() => import('@/views/gallery/List')),
        authority: [],
    },
    {
        key: 'galleryEdit',
        path: `/gallery/edit/:galleryId`,
        component: lazy(() => import('@/views/gallery/Edit')),
        authority: [],
        meta: {
            header: 'Edit gallery',
        },
    },
    {
        key: 'imageListByGalleryId',
        path: '/image/:galleryId',
        component: lazy(() => import('@/views/image/ListByGalleryId')),
        authority: [],
    },
    {
        key: 'imageList',
        path: '/image',
        component: lazy(() => import('@/views/image/List')),
        authority: [],
    },
    {
        key: 'imageEdit',
        path: '/image/edit/:imageId',
        component: lazy(() => import('@/views/image/Edit')),
        authority: [],
    },
    {
        key: 'tag',
        path: '/tag',
        component: lazy(() => import('@/views/tag/List')),
        authority: [],
    },
    {
        key: 'tagNew',
        path: '/tag/new',
        component: lazy(() => import('@/views/tag/New')),
        authority: [],
    },
    {
        key: 'calender',
        path: '/calender',
        component: lazy(() => import('@/views/calender/View')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-View',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-View-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-View-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-View',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-View-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-View-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
]