export interface PropsTable {
    id: string;
    package: string;
    model: string;
    points: string;
    money: string;
    totalBuy: string;
    function: string;
    strategy: string;
    files: string;
    totalFunction: string,
    createDate: string;
}

const generateIdCode = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `#${randomNumber.toString().padStart(6, '0')}`;
}


const PublisherTable: PropsTable[] = [
    {
        id: generateIdCode(),
        package: 'GPT-0',
        model: 'Chat GPT-0',
        points: '100.000',
        money: '20.000.000',
        totalBuy: '100',
        function: 'Đọc lệnh',
        strategy: 'Lắng nghe',
        files: '10',
        totalFunction: '20',
        createDate: '11-2-2024'

    },
    {
        id: generateIdCode(),
        package: 'GPT-1',
        model: 'Chat GPT-1',
        points: '120.000',
        money: '24.000.000',
        totalBuy: '100',
        function: 'Đọc lệnh',
        strategy: 'Lắng nghe',
        files: '10',
        totalFunction: '20',
        createDate: '11-2-2024'

    },
    {
        id: generateIdCode(),
        package: 'GPT-0',
        model: 'Chat GPT-0',
        points: '100.000',
        money: '20.000.000',
        totalBuy: '100',
        function: 'Đọc lệnh',
        strategy: 'Lắng nghe',
        files: '10',
        totalFunction: '20',
        createDate: '11-2-2024'

    },
    {
        id: generateIdCode(),
        package: 'GPT-0',
        model: 'Chat GPT-0',
        points: '100.000',
        money: '20.000.000',
        totalBuy: '100',
        function: 'Đọc lệnh',
        strategy: 'Lắng nghe',
        files: '10',
        totalFunction: '20',
        createDate: '11-2-2024'

    },

]

export default PublisherTable;