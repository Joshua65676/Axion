import { Home, Bookmark, Search, Setting } from '../assets'

export const MenuListItems = [
    {id: 'item-1',  icons: Home, itemsName: 'Home', path: '/home'},
    {id: 'item-2',  icons: Bookmark, itemsName: 'All Bookmarks', path: '/allbookmarks'},
    {id: 'item-3',  icons: Search, itemsName: 'Search', path: '/search'},
    {id: 'item-4',  icons: Search, itemsName: 'Category', path: '/category'},
    {id: 'item-5',  icons: Setting, itemsName: 'Reminder Settings', path: '/settings'}
]

export const PermissionList = [
    {id: 'permission-1', itemsName: 'Read your bookmarks'},
    {id: 'permission-2', itemsName: 'Access basic profile info'},
    {id: 'permission-3', itemsName: 'Send notifications (optional)'},
]