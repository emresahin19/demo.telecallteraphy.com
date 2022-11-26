// assets
import { IconKey, IconBrandGithub } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconBrandGithub,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'experts',
            title: 'Uzmanlar',
            type: 'item',
            url: '/experts',
            icon: icons.IconBrandGithub,
            breadcrumbs: true
        },
        {
            id: 'patients',
            title: 'Danışanlar',
            type: 'item',
            url: '/patients',
            icon: icons.IconBrandGithub,
            breadcrumbs: true
        },
        {
            id: 'interviews',
            title: 'Seanslar',
            type: 'item',
            url: '/interviews',
            icon: icons.IconBrandGithub,
            breadcrumbs: true
        },
    ]
};

export default pages;
