import VerifiedIcon from '@mui/icons-material/Verified';
import {
    Alert,
    Avatar,
    Box,
    CardMedia,
    Grid,
    IconButton,
    Snackbar,
    styled,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconCameraBolt } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import profilecover from 'src/assets/images/backgrounds/profilebg.jpg';
import userimg from 'src/assets/images/profile/user-1.jpg';
import BlankCard from 'src/components/shared/BlankCard';
import ProfileTab from './ProfileTab';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import { fetchGetUserInfo, setAvatar } from 'src/store/user/account/getUserInfoSlice';
import { fetchChangeAvatar } from 'src/store/user/account/changeAvatarSlice';
import { ApiResponse } from 'src/types/services/response/response';
import { SnackbarProps } from 'src/types/components/snackbar';

const ProfileBanner = () => {
    const [bannerImage] = useState(profilecover);
    const [avatarImage, setAvatarImage] = useState(userimg);
    const theme = useTheme();
    const [config, setConfig] = useState<SnackbarProps>({
        open: false,
        content: '',
        severity: 'error',
    });

    const primary = theme.palette.primary.light;

    const ProfileImage = styled(Box)(() => ({
        backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
        borderRadius: '50%',
        width: '110px',
        height: '110px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        position: 'relative',
    }));

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = URL.createObjectURL(event.target.files[0]);
            setAvatarImage(file);
            const responseChangAvatar = await dispatch(fetchChangeAvatar(event.target.files[0]));
            const dataChangAvatar = responseChangAvatar.payload as ApiResponse<string>;
            if (dataChangAvatar.code == 200) {
                dispatch(setAvatar(dataChangAvatar.result));
                setConfig({
                    content: 'Thay đổi avatar thành công',
                    open: true,
                    severity: 'success',
                });
            } else {
                setConfig({
                    content: dataChangAvatar.message || 'Có lỗi xảy ra',
                    open: true,
                    severity: 'error',
                });
            }
        }
    };

    // Slice
    const dataUserInfo = useSelector((state: AppState) => state.getUserInfo.data);
    const userInfo = dataUserInfo?.result;
    useEffect(() => {
        if (dataUserInfo?.code != 200) {
            dispatch(fetchGetUserInfo());
        }
    }, []);

    return (
        <>
            <BlankCard>
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        image={bannerImage}
                        alt="Profile cover"
                        sx={{
                            width: '100%',
                            height: '300px',
                            objectFit: 'cover',
                        }}
                    />
                    <Grid
                        container
                        spacing={0}
                        sx={{
                            justifyContent: { xs: 'space-evenly', sm: 'space-evenly' },
                            alignItems: 'center',
                            display: { xs: 'flex', sm: 'flex' },
                        }}
                    >
                        {/* Thông tin người dùng */}
                        <Grid
                            item
                            lg={4}
                            sm={12}
                            xs={12}
                            sx={{
                                order: {
                                    xs: '1',
                                    sm: '1',
                                    lg: '1',
                                },
                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    mt: '-85px',
                                    position: 'relative',
                                }}
                            >
                                <Box textAlign="center">
                                    <ProfileImage>
                                        <Avatar
                                            src={userInfo.avatar || avatarImage}
                                            alt="User avatar"
                                            sx={{
                                                borderRadius: '50%',
                                                width: '100px',
                                                height: '100px',
                                                border: '4px solid #fff',
                                            }}
                                        />
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="upload-avatar"
                                            type="file"
                                            onChange={handleAvatarChange}
                                        />
                                        <label htmlFor="upload-avatar">
                                            <IconButton
                                                component="span"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: '-10px',
                                                    backgroundColor: primary,
                                                    padding: '5px',
                                                    borderRadius: '50%',
                                                    cursor: 'pointer',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: primary,
                                                    },
                                                }}
                                            >
                                                <IconCameraBolt style={{ fontSize: '30px' }} />
                                            </IconButton>
                                        </label>
                                    </ProfileImage>

                                    <Box
                                        mt={1}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Typography
                                            fontWeight={600}
                                            variant="h5"
                                            display="flex"
                                            alignItems="center"
                                            sx={{ textAlign: 'center' }}
                                        >
                                            {userInfo.name || 'Tên người dùng'}
                                        </Typography>
                                        <VerifiedIcon
                                            sx={{ color: '#1DA1F2', fontSize: '20px', ml: 1 }}
                                        />
                                    </Box>

                                    <Typography
                                        color="textSecondary"
                                        variant="h6"
                                        fontWeight={400}
                                        sx={{ color: '#757575', textAlign: 'center' }}
                                    >
                                        {userInfo.phoneNumber || 'Số điện thoại'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <ProfileTab />
                </Box>
            </BlankCard>
            <Snackbar
                open={config.open}
                autoHideDuration={5000}
                onClose={() =>
                    setConfig({
                        ...config,
                        open: false,
                    })
                }
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    variant="filled"
                    severity={config.severity}
                    sx={{ width: '100%', display: 'flex', alignItems: 'center', px: 3 }}
                >
                    {config.content}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProfileBanner;
