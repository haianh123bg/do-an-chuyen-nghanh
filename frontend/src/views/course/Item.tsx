// import React from 'react';
// import { useDrag } from 'react-dnd';
// import { Box, Typography } from '@mui/material';

// interface ItemProps {
//   item: any;
// }

// const Item: React.FC<ItemProps> = ({ item }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: 'item',
//     item: { id: item.id, type: item.type },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <Box
//       ref={drag}
//       sx={{
//         p: 1,
//         mb: 1,
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         backgroundColor: isDragging ? '#f0f0f0' : '#fff',
//       }}
//     >
//       <Typography>{item.type}</Typography>
//     </Box>
//   );
// };

// export default Item;
