// import React, { useState } from 'react';
// import { Box, Button, Paper, Typography } from '@mui/material';
// import { useDrag, useDrop } from 'react-dnd';
// import Item from 'src/views/course/Item.tsx';

// interface SectionProps {
//     section: any;
//     sections: any[];
//     setSections: React.Dispatch<React.SetStateAction<any[]>>;
//     index: number;
// }

// const Section: React.FC<SectionProps> = ({ section, sections, setSections, index }) => {
//     const [items, setItems] = useState(section.items);

//     const addItem = (type: string) => {
//         const newItem = { id: Date.now(), type };
//         setItems([...items, newItem]);
//     };

//     const [, ref] = useDrop({
//         accept: 'section',
//         hover: (draggedSection: any) => {
//             const draggedIndex = sections.findIndex((s) => s.id === draggedSection.id);
//             if (draggedIndex !== index) {
//                 const updatedSections = [...sections];
//                 const [removed] = updatedSections.splice(draggedIndex, 1);
//                 updatedSections.splice(index, 0, removed);
//                 setSections(updatedSections);
//             }
//         },
//     });

//     const [{ isDragging }, drag] = useDrag({
//         type: 'section',
//         item: { id: section.id },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),
//     });

//     return (
//         <Paper
//             ref={(node) => drag(ref(node))}
//             elevation={3}
//             sx={{
//                 p: 2,
//                 mb: 2,
//                 backgroundColor: isDragging ? '#f0f0f0' : '#ffffff',
//             }}
//         >
//             <Typography variant="h6">Section {index + 1}</Typography>
//             <Box>
//                 {items.map((item) => (
//                     <Item key={item.id} item={item} />
//                 ))}
//             </Box>
//             <Box mt={2}>
//                 <Button variant="outlined" onClick={() => addItem('Lecture')} sx={{ mr: 1 }}>
//                     + Lecture
//                 </Button>
//                 <Button variant="outlined" onClick={() => addItem('Quiz')} sx={{ mr: 1 }}>
//                     + Quiz
//                 </Button>
//                 <Button variant="outlined" onClick={() => addItem('Coding Exercise')}>
//                     + Coding Exercise
//                 </Button>
//             </Box>
//         </Paper>
//     );
// };

// export default Section;
