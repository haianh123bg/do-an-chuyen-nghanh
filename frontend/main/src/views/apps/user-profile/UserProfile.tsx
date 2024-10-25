// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import React from 'react';
// import { Grid } from '@mui/material';
// import PageContainer from 'src/components/container/PageContainer';

// import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
// import IntroCard from 'src/components/apps/userprofile/profile/IntroCard';
// import PhotosCard from 'src/components/apps/userprofile/profile/PhotosCard';
// import Post from 'src/components/apps/userprofile/profile/Post';

// const UserProfile = () => {
//   return (
//     <PageContainer title="Hồ sơ người dùng" description="this is User Profile page">

//       <Grid container spacing={3}>
//         <Grid item sm={12}>
//           <ProfileBanner />
//         </Grid>

//         {/* intro and Photos Card */}
//         <Grid item sm={12} lg={4} xs={12}>
//           <Grid container spacing={3}>
//             <Grid item sm={12}>
//               <IntroCard />
//             </Grid>
//             <Grid item sm={12}>
//               <PhotosCard />
//             </Grid>
//           </Grid>
//         </Grid>
//         {/* Posts Card */}
//         <Grid item sm={12} lg={8} xs={12}>
//           <Post />
//         </Grid>
//       </Grid>
//     </PageContainer>
//   );
// };

// export default UserProfile;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Tabs, Tab, Box, CardContent, Divider } from '@mui/material';

// components
import AccountTab from '../../../components/pages/account-setting/AccountTab';
import {  IconUserCircle } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';

const BCrumb = [
  {
    to: '/',
    title: 'Trang chủ',
  },
  {
    title: 'Tài khoản',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const AccountSetting = () => {
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="Cài đặt tài khoản" description="this is Account Setting page">
      {/* breadcrumb */}
      <Breadcrumb title="Tài khoản cá nhân" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlankCard>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="basic tabs example"
              sx={{ '& .MuiTab-root': { paddingLeft: '16px' } }} // Điều chỉnh padding cho các tab
              >

                <Tab
                  iconPosition="start"
                  icon={<IconUserCircle size="22" />}
                  label="Tài khoản"
                  {...a11yProps(0)}
                />

               
              </Tabs>
            </Box>
            <Divider />
            <CardContent>
              <TabPanel value={value} index={0}>
                <AccountTab />
              </TabPanel>
             
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountSetting;
