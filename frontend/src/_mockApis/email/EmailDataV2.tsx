import { EmailTypeV2 } from 'src/types/apps/email';
import mock from '../mock';

const EmailDataV2: EmailTypeV2[] = [
    {
        id: 1,
        from: 'Chi',
        To: 'Hải Anh',
        thumbnail: '',
        listMessages: [
            {
                emailContent: 'Chào Hải Anh',
                subject: 'Hỗ trợ kỹ thuật',
                time: '20/10/2024',
            },
        ],
    },
];

mock.onGet('/api/data/email/EmailDataV2').reply(() => {
    const emails = EmailDataV2;

    return [200, JSON.parse(JSON.stringify(emails))];
});

export default EmailDataV2;
