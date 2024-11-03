// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Box, CardMedia, Grid, Stack, styled, Typography } from '@mui/material';
import profilecover from 'src/assets/images/backgrounds/profilebg.jpg';
import userimg from 'src/assets/images/profile/user-1.jpg';
import ProfileTab2 from './ProfileTab2';
const ProfileBanner2 = () => {
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  }));

  return (
    <>
      <CardMedia component="img" image={profilecover} alt={profilecover} width="100%" />
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: { xs: 'space-between', sm: 'space-between' },
          alignItems: 'center',

          display: { xs: 'flex', sm: 'flex' },
        }}
      >
        <Grid
          item
          lg={4}
          sm={6}
          md={5}
          xs={12}
          sx={{
            order: {
              xs: '3',
              sm: '2',
              lg: '1',
            },
          }}
        >
          <Stack
            direction="row"
            textAlign="center"
            justifyContent="start"
            my={2}
            spacing={6}
            px={2}
          ></Stack>
        </Grid>
        {/* about profile */}
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
            textAlign="center"
            justifyContent="center"
            sx={{
              mt: '-85px',
            }}
          >
            <Box>
              <ProfileImage>
                <Avatar
                  src={userimg}
                  alt={userimg}
                  sx={{
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px',
                    border: '4px solid #fff',
                  }}
                />
              </ProfileImage>
              <Box mt={1}>
                <Typography fontWeight={600} variant="h5" display="flex" alignItems="center">
                  Nguyễn Đăng Hòa
                  <VerifiedIcon sx={{ color: '#1DA1F2', fontSize: '20px', ml: 1 }} />
                </Typography>

                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight={400}
                  sx={{ color: '#757575' }}
                >
                  0981522873
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
          sx={{
            order: {
              xs: '3',
              sm: '3',
              lg: '3',
            },
          }}
        ></Grid>
      </Grid>

      <ProfileTab2 />
    </>
  );
};

export default ProfileBanner2;
