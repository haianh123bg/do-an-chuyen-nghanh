import { uniqueId } from 'lodash';

interface MenuitemsType {
    [x: string]: any;
    id?: string;
    navlabel?: boolean;
    subheader?: string;
    title?: string;
    icon?: any;
    href?: string;
    children?: MenuitemsType[];
    chip?: string;
    chipColor?: string;
    variant?: string;
    external?: boolean;
}
import { IconAperture, IconChartDonut3, IconPoint } from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
    {
        navlabel: true,
        subheader: 'Home',
    },
    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconAperture,
        href: '/admin/dashboards/modern',
        chip: 'New',
        chipColor: 'secondary',
    },
    {
        id: uniqueId(),
        title: 'Quản lý khóa học',
        icon: IconAperture,
        href: '/admin/course',
        chipColor: 'secondary',
    },
    {
        id: uniqueId(),
        title: 'Quản lý tài khoản',
        icon: IconChartDonut3,
        href: '/admin/account/user',
        children: [
            {
                id: uniqueId(),
                title: 'Học viên',
                icon: IconPoint,
                href: '/admin/account/user',
            },
            {
                id: uniqueId(),
                title: 'Giáo viên',
                icon: IconPoint,
                href: '/admin/account/teacher',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Quản lý danh mục',
        icon: IconAperture,
        href: '/admin/category',
        chipColor: 'secondary',
    },
    {
        id: uniqueId(),
        title: 'Ticket',
        icon: IconAperture,
        href: '/admin/ticket',
        chipColor: 'secondary',
    },
];

export default Menuitems;
