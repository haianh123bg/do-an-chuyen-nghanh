import { List, ListItem, ListItemButton, Radio, ListItemText, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SidebarItem } from '../types/course';

const PurpleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9c27b0',
  color: 'white',
  '&:hover': {
    backgroundColor: '#7b1fa2',
  },
  marginTop: theme.spacing(2),
  width: '100%',
}));

interface SidebarProps {
  items: SidebarItem[];
  onSelect: (index: number) => void;
  onSubmit: () => void;
}

export default function Sidebar({ items, onSelect, onSubmit }: SidebarProps) {
  return (
    <List sx={{ width: 280, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
      {items.map((item, index) => (
        <ListItemButton
          key={item.id}
          selected={item.selected}
          onClick={() => onSelect(index)}
          sx={{ py: 1.5, px: 3 }}
        >
          <Radio
            checked={item.selected}
            sx={{ mr: 1 }}
          />
          <ListItemText primary={item.title} />
        </ListItemButton>
      ))}
      <PurpleButton
        variant="contained"
        onClick={onSubmit}
      >
        Submit for Review
      </PurpleButton>
    </List>
  );
}

