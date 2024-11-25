import { Grid } from '@mui/material';
import { useState } from 'react';
import { default as AccountInformation } from 'src/components/applications/user/user-account/profile/AccountInformation';
import BankInformation from 'src/components/applications/user/user-account/profile/BankInformation';
import ChangePassword from 'src/components/applications/user/user-account/profile/ChangePassword';
import PersonalInformation from 'src/components/applications/user/user-account/profile/PersonalInformation';
import ProfileBanner from 'src/components/applications/user/user-account/profile/ProfileBanner';
import ReceiveEmail from 'src/components/applications/user/user-account/profile/ReceiveEmail';
import Sidebar from 'src/components/applications/user/user-account/profile/Sidebar';
import PageContainer from 'src/components/container/PageContainer';

const UserProfile = () => {
    // Local state to track selected section
    const [selectedSection, setSelectedSection] = useState('personal');

    // Function to handle section selection
    const handleButtonClick = (buttonName: string) => {
        setSelectedSection(buttonName);
    };

    return (
        <PageContainer title="Trang cá nhân" description="this is User Profile page">
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <ProfileBanner />
                </Grid>
                <Grid container spacing={3} mt={3}>
                    <Grid item sm={12} lg={3} xs={12}>
                        <Sidebar selected={selectedSection} onSelect={handleButtonClick} />
                    </Grid>
                    <Grid item sm={12} lg={9} xs={12}>
                        {selectedSection === 'personal' && <PersonalInformation />}
                        {selectedSection === 'account' && <AccountInformation />}
                        {selectedSection === 'banking' && <BankInformation />}
                        {selectedSection === 'changepassword' && <ChangePassword />}
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default UserProfile;
