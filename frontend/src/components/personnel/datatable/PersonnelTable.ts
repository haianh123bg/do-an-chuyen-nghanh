import u1 from 'src/assets/images/profile/user-1.jpg';
import u2 from 'src/assets/images/profile/user-2.jpg';
import u3 from 'src/assets/images/profile/user-3.jpg';
import u4 from 'src/assets/images/profile/user-4.jpg';
import u5 from 'src/assets/images/profile/user-5.jpg';
import u6 from 'src/assets/images/profile/user-6.jpg';
import u7 from 'src/assets/images/profile/user-7.jpg';
import u8 from 'src/assets/images/profile/user-8.jpg';
import u9 from 'src/assets/images/profile/user-9.jpg';
import u10 from 'src/assets/images/profile/user-10.jpg';

// interface ActionProps {
//     them: boolean,
//     xem: boolean,
//     sua: boolean,
//     xoa: boolean,
//     khong: boolean
// }

// interface Permissions {
//     [functionName: string]: ActionProps;
// }

interface PersonnelTables {
    id: string;
    createdAt: Date;
    employeeName: string;
    department: string;
    email: string;
    phoneNumber: string;
    articleCount: number;
    status: boolean;
    isActive: boolean;
    avt: string,
    position: string,
    isValidate: boolean,
    // permissions?: Permissions
}

const images = [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10];
const position = ['Nhân viên', 'Giám độc', 'Sales', 'Kế toán']

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

const getRandomPosition = () => {
    const randomPosition = Math.floor(Math.random() * position.length)
    return position[randomPosition]
}
const PersonnelTable: PersonnelTables[] = [
    {
        id: '1',
        createdAt: new Date('2023-11-22'),
        employeeName: 'Nguyễn Thùy Dung',
        department: 'Phát triển phần mềm',
        email: 'thuydung@example.com',
        phoneNumber: '0987654321',
        articleCount: 5,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: true, sua: false, xoa: true, khong: false },
        //     'Chức năng 2': { xem: true, them: true, sua: false, xoa: false, khong: true }
        // }
    },
    {
        id: '2',
        createdAt: new Date('2023-11-23'),
        employeeName: 'Trần Văn Bình',
        department: 'Thiết kế đồ họa',
        email: 'vanbinh@example.com',
        phoneNumber: '0987654322',
        articleCount: 3,
        status: false,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: true, them: false, sua: true, xoa: false, khong: false },
        //     'Chức năng 2': { xem: true, them: true, sua: false, xoa: true, khong: false }
        // }
    },
    {
        id: '3',
        createdAt: new Date('2023-11-24'),
        employeeName: 'Lê Thị Mai',
        department: 'Marketing',
        email: 'maile@example.com',
        phoneNumber: '0987654323',
        articleCount: 8,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: true, them: false, sua: true, xoa: false, khong: true },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: true }
        // }
    },
    {
        id: '4',
        createdAt: new Date('2023-11-25'),
        employeeName: 'Phạm Văn Nam',
        department: 'Kế toán',
        email: 'nam@example.com',
        phoneNumber: '0987654324',
        articleCount: 2,
        status: false,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '5',
        createdAt: new Date('2023-11-26'),
        employeeName: 'Vũ Thị Hương',
        department: 'Ban Giám đốc',
        email: 'huong@example.com',
        phoneNumber: '0987654325',
        articleCount: 10,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '6',
        createdAt: new Date('2023-11-27'),
        employeeName: 'Nguyễn Thị Ngọc Anh',
        department: 'Phát triển phần mềm',
        email: 'ngocanh@example.com',
        phoneNumber: '0987654326',
        articleCount: 4,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '7',
        createdAt: new Date('2023-11-28'),
        employeeName: 'Trần Đức Minh',
        department: 'Thiết kế đồ họa',
        email: 'ducminh@example.com',
        phoneNumber: '0987654327',
        articleCount: 6,
        status: false,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '8',
        createdAt: new Date('2023-11-29'),
        employeeName: 'Lê Thị Phương',
        department: 'Marketing',
        email: 'phuongle@example.com',
        phoneNumber: '0987654328',
        articleCount: 7,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '9',
        createdAt: new Date('2023-11-30'),
        employeeName: 'Phạm Văn Hùng',
        department: 'Kế toán',
        email: 'hungpham@example.com',
        phoneNumber: '0987654329',
        articleCount: 2,
        status: false,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '10',
        createdAt: new Date('2023-12-01'),
        employeeName: 'Vũ Thị Linh',
        department: 'Ban Giám đốc',
        email: 'linhvu@example.com',
        phoneNumber: '0987654330',
        articleCount: 9,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '11',
        createdAt: new Date('2023-12-02'),
        employeeName: 'Đặng Thị Mỹ Linh',
        department: 'Phát triển phần mềm',
        email: 'mylinh@example.com',
        phoneNumber: '0987654331',
        articleCount: 3,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '12',
        createdAt: new Date('2023-12-03'),
        employeeName: 'Bùi Văn Tuấn',
        department: 'Thiết kế đồ họa',
        email: 'tuanbui@example.com',
        phoneNumber: '0987654332',
        articleCount: 5,
        status: false,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '13',
        createdAt: new Date('2023-12-04'),
        employeeName: 'Nguyễn Thị Ngọc Ánh',
        department: 'Marketing',
        email: 'ngocanhnguyen@example.com',
        phoneNumber: '0987654333',
        articleCount: 8,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '14',
        createdAt: new Date('2023-12-05'),
        employeeName: 'Trần Đức Anh',
        department: 'Kế toán',
        email: 'ducanhtran@example.com',
        phoneNumber: '0987654334',
        articleCount: 2,
        status: false,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '15',
        createdAt: new Date('2023-12-06'),
        employeeName: 'Lê Thị Thu Hà',
        department: 'Ban Giám đốc',
        email: 'thuha@example.com',
        phoneNumber: '0987654335',
        articleCount: 10,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '16',
        createdAt: new Date('2023-12-07'),
        employeeName: 'Lê Văn Hoàng',
        department: 'Phát triển phần mềm',
        email: 'hoanglv@example.com',
        phoneNumber: '0987654336',
        articleCount: 4,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '17',
        createdAt: new Date('2023-12-08'),
        employeeName: 'Nguyễn Thị Thu Trang',
        department: 'Thiết kế đồ họa',
        email: 'trangnt@example.com',
        phoneNumber: '0987654337',
        articleCount: 6,
        status: false,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '18',
        createdAt: new Date('2023-12-09'),
        employeeName: 'Trần Đức Tài',
        department: 'Marketing',
        email: 'taidt@example.com',
        phoneNumber: '0987654338',
        articleCount: 7,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '19',
        createdAt: new Date('2023-12-10'),
        employeeName: 'Phạm Thị Mỹ Linh',
        department: 'Kế toán',
        email: 'mylinhpm@example.com',
        phoneNumber: '0987654339',
        articleCount: 2,
        status: false,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    },
    {
        id: '20',
        createdAt: new Date('2023-12-11'),
        employeeName: 'Vũ Văn Nam',
        department: 'Ban Giám đốc',
        email: 'namvv@example.com',
        phoneNumber: '0987654340',
        articleCount: 9,
        status: true,
        isActive: true,
        avt: getRandomImage(),
        position: getRandomPosition(),
        isValidate: true,
        // permissions: {
        //     'Chức năng 1': { xem: false, them: false, sua: false, xoa: false, khong: false },
        //     'Chức năng 2': { xem: false, them: true, sua: false, xoa: false, khong: false }
        // }
    }
];

export default PersonnelTable;