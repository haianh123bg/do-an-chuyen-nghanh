import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import DescriptionIcon from '@mui/icons-material/Description';

const UploadBox = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[50],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const IconGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
}));

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
}

export default function ImageUpload({ onFileSelect }: ImageUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <UploadBox>
      <IconGrid>
        <IconBox>
          <DescriptionIcon sx={{ fontSize: 30 }} />
        </IconBox>
        <IconBox>
          <VideocamIcon sx={{ fontSize: 30 }} />
        </IconBox>
        <IconBox>
          <ImageIcon sx={{ fontSize: 30 }} />
        </IconBox>
      </IconGrid>
      <Box sx={{ textAlign: 'center' }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            component="span"
            sx={{
              bgcolor: 'white',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Upload File
          </Button>
        </label>
        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
          No file selected
        </Typography>
      </Box>
    </UploadBox>
  );
}

