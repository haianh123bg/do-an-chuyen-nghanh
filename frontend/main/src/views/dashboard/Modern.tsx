// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import TopCards from 'src/components/dashboards/modern/TopCards';
import Social from 'src/components/dashboards/modern/Social';
import TopPerformers from 'src/components/dashboards/modern/TopPerformers';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import { RevenueChart } from 'src/components/dashboards/modern/RevenueChart';
import YearlyBreakupCustom from 'src/components/dashboards/modern/YearlyBreakupCustom';
import MonthlyEarningsCustom from 'src/components/dashboards/modern/MonthlyEarningsCustom';
import CustomersCustom from 'src/components/dashboards/modern/CustomersCustom';
import ProjectsCustom from 'src/components/dashboards/modern/ProjectsCustom';
import WebsiteTraffic from 'src/components/dashboards/modern/WebsiteTraffic';
import UserOnline from 'src/components/dashboards/modern/UserOnline';

const Modern = () => {
    return (
        <PageContainer title="Modern Dashboard" description="this is Modern Dashboard page">
            <Box>
                <Grid container spacing={3}>
                    {/* column */}
                    <Grid item xs={12} lg={12}>
                        <TopCards />
                    </Grid>
                    {/* column */}
                    <Grid item xs={12} lg={8}>
                        <RevenueChart />
                    </Grid>
                    {/* column */}
                    <Grid item xs={12} lg={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} lg={12}>
                                <YearlyBreakupCustom />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={12}>
                                <MonthlyEarningsCustom />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* column */}

                    <Grid item xs={12} lg={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <CustomersCustom />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ProjectsCustom />
                            </Grid>
                            <Grid item xs={12}>
                                <Social />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* column */}
                    <Grid item xs={12} lg={8}>
                        <TopPerformers />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                        <WebsiteTraffic />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                        <UserOnline />
                    </Grid>
                </Grid>
                {/* column */}
                <Welcome />
            </Box>
        </PageContainer>
    );
};

export default Modern;
