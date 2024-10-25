import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Box, CardMedia, Grid, IconButton, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconCameraBolt } from '@tabler/icons-react';
import React, { useState } from 'react';
import profilecover from 'src/assets/images/backgrounds/profilebg.jpg';
import userimg from 'src/assets/images/profile/user-1.jpg';
import BlankCard from 'src/components/shared/BlankCard';
import ProfileTab from './ProfileTab';

const ProfileBanner = () => {
    const [bannerImage] = useState(profilecover);
    const [avatarImage, setAvatarImage] = useState(userimg);
    const theme = useTheme();

    // Dữ liệu người dùng mẫu
    const userme = {
        name: 'Nguyễn Ngọc Hải Anh',
        avatarUrl: '', // Có thể thay bằng đường dẫn tới ảnh người dùng nếu có
        phoneNumber: '0901234567'
    };

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

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = URL.createObjectURL(event.target.files[0]);
            setAvatarImage(file);
        }
    };

    return (
        <>
            <BlankCard>
                {userme ? (
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
                                                src={userme.avatarUrl || avatarImage}
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
                                                {userme.name || 'Tên người dùng'}
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
                                            {userme.phoneNumber || 'Số điện thoại'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <ProfileTab />
                    </Box>
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary">
                        Không có thông tin người dùng
                    </Typography>
                )}
            </BlankCard>
        </>
    );
};

export default ProfileBanner;
