import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import { useState } from 'react';
import admin from 'src/assets/Adminphoto/admin.png';
import online from 'src/assets/Adminphoto/hoat dong.png';
import course from 'src/assets/Adminphoto/khóa.png';
import employee from 'src/assets/Adminphoto/nhan vien.png';
import TopCard from 'src/components/widgets/cards/TopCard';
import Decentralization from './component/Decentralization';
import PersonnelTab from './component/personnelTab';
// import Decentralization2 from './component/Decentralization2';

interface StyleProps {
  bgColor: string;

  title: string;
  total: string;
  icons: JSX.Element;
}

const DataBox: StyleProps[] = [
  {
    bgColor: 'primary.light',
    title: 'Nhân viên',
    total: '120',
    icons: (
      <Box
        textAlign="center"
        padding={1}
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={employee} width={30} />
      </Box>
    ),
  },
  {
    bgColor: 'primary.light',
    title: 'Admin',
    total: '5',
    icons: (
      <Box
        textAlign="center"
        padding={1}
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <IconChartBar color="white" size={30} /> */}
        <img src={admin} width={30} />
      </Box>
    ),
  },
  {
    bgColor: 'primary.light',
    title: 'Hoạt động',
    total: '52',
    icons: (
      <Box
        textAlign="center"
        padding={1}
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={online} width={30} />
      </Box>
    ),
  },
  {
    bgColor: 'primary.light',
    title: 'Khóa',
    total: '12',
    icons: (
      <Box
        textAlign="center"
        padding={1}
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <IconChartBar color="white" size={30} /> */}
        <img src={course} width={30} />
      </Box>
    ),
  },
];

const Personnels = () => {
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TopCard dataSource={DataBox} totalColumn={4} />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',  
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Nhân viên" value="1" />
                <Tab label="Phân quyền" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <PersonnelTab
                    value={value}
                    open={open}
                    setOpen={setOpen}
                    setSelectedKey={setSelectedKey}
                    selectedKey={selectedKey}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Decentralization />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Personnels;
