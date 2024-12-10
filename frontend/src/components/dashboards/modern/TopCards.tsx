import { Box, CardContent, Grid, Typography } from '@mui/material';

import icon1 from '../../../assets/images/svgs/icon-connect.svg';
import icon2 from '../../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon4 from '../../../assets/images/svgs/icon-mailbox.svg';
import icon5 from '../../../assets/images/svgs/icon-favorites.svg';
import icon6 from '../../../assets/images/svgs/icon-speech-bubble.svg';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import { useEffect } from 'react';
import { fetchMOverview } from 'src/store/admin/mdashboard/mOverviewSlice';

interface cardType {
    icon: string;
    title: string;
    digits: string | number;
    bgcolor: string;
}

const TopCards = () => {
    /**
     * BEGIN SLICE
     */
    const dataMOverview = useSelector((state: AppState) => state.mOverviewSlice.data);
    /**
     * END SLICE
     */

    /**
     * BEGIN CHILDREN
     */
    const mOverview = dataMOverview.result;
    /**
     * END CHILDREN
     */

    /**
     * BEGIN USE_EFFECT
     */
    useEffect(() => {
        if (dataMOverview.code != 200) {
            dispatch(fetchMOverview());
        }
    }, []);
    /**
     * END USE_EFFECT
     */
    /**
     * BEGIN OTHER
     */
    const topcards: cardType[] = [
        {
            icon: icon2,
            title: 'Học viên',
            digits: mOverview.totalStudent,
            bgcolor: 'primary',
        },
        {
            icon: icon3,
            title: 'Khóa học',
            digits: mOverview.totalCourse,
            bgcolor: 'warning',
        },
        {
            icon: icon4,
            title: 'Giáo viên',
            digits: mOverview.totalTeacher,
            bgcolor: 'secondary',
        },
        {
            icon: icon5,
            title: 'Adsense',
            digits: mOverview.adsense,
            bgcolor: 'error',
        },
        {
            icon: icon6,
            title: 'Doanh thu',
            digits: mOverview.totalRevenue,
            bgcolor: 'success',
        },
        {
            icon: icon1,
            title: 'Bài viết  ',
            digits: mOverview.totalBlog,
            bgcolor: 'info',
        },
    ];
    /**
     * END OTHER
     */
    return (
        <Grid container spacing={3} mt={3}>
            {topcards.map((topcard, i) => (
                <Grid item xs={12} sm={4} lg={2} key={i}>
                    <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
                        <CardContent>
                            <img src={topcard.icon} alt={topcard.icon} width="50" />
                            <Typography
                                color={topcard.bgcolor + '.main'}
                                mt={1}
                                variant="subtitle1"
                                fontWeight={600}
                            >
                                {topcard.title}
                            </Typography>
                            <Typography
                                color={topcard.bgcolor + '.main'}
                                variant="h4"
                                fontWeight={600}
                            >
                                {topcard.digits}
                            </Typography>
                        </CardContent>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default TopCards;
