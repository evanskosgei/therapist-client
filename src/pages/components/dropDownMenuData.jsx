
import { Home, Settings, LogOut, BookUser, Newspaper, Users, BadgeDollarSign, HelpCircle } from 'lucide-react'

export const dropDownMenuData = () => [
    {
        id: 'home',
        label: 'Home',
        icon: Home,
        link: '/home'
    },
    {
        id: 'session',
        label: 'Sessions',
        icon: BookUser,
        link: '/home/session'
    },
    {
        id: 'buy-article',
        label: 'Buy Article',
        icon: Newspaper,
        link: '#'
    },
    {
        id: 'communities',
        label: 'Communities',
        icon: Users,
        link: '/home/communities'
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        link: '/home/settings'
    },
    {
        id: 'balance',
        label: 'Balance',
        icon: BadgeDollarSign,
        link: '/home/balance'
    },
    {
        id: 'help',
        label: 'How it Works',
        icon: HelpCircle,
        link: '#'
    },
    {
        id: 'logout',
        label: 'Log Out',
        icon: LogOut,
        link: '/logout'
    }
]