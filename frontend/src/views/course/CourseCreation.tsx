import React, { useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Section {
    id: number;
    title: string; // Fixed title like "Section 1"
    editableTitle: string; // Editable name for the section
    items: CurriculumItem[];
}

type CurriculumItem = {
    id: number;
    type: 'Lecture' | 'Quiz' | 'Coding Exercise';
    title: string; // Editable title for the item
};

const App: React.FC = () => {
    const [sections, setSections] = useState<Section[]>([
        { id: 1, title: 'Section 1', editableTitle: 'Introduction', items: [] },
    ]);
    const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);

    const addItem = (sectionId: number, type: CurriculumItem['type']) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                          ...section,
                          items: [
                              ...section.items,
                              {
                                  id: Date.now(),
                                  type,
                                  title: `${type} ${section.items.length + 1}`,
                              },
                          ],
                      }
                    : section,
            ),
        );
    };

    const deleteItem = (sectionId: number, itemId: number) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                          ...section,
                          items: section.items.filter((item) => item.id !== itemId),
                      }
                    : section,
            ),
        );
    };

    const addSection = () => {
        const newId = sections.length + 1;
        setSections((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: `Section ${newId}`,
                editableTitle: `New Section ${newId}`,
                items: [],
            },
        ]);
    };

    const deleteSection = (sectionId: number) => {
        setSections((prev) => prev.filter((section) => section.id !== sectionId));
    };

    const updateEditableSectionTitle = (sectionId: number, newEditableTitle: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? { ...section, editableTitle: newEditableTitle }
                    : section,
            ),
        );
    };

    const updateItemTitle = (sectionId: number, itemId: number, newTitle: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                          ...section,
                          items: section.items.map((item) =>
                              item.id === itemId ? { ...item, title: newTitle } : item,
                          ),
                      }
                    : section,
            ),
        );
    };

    return (
        <Box sx={{ padding: '16px' }}>
            <Typography variant="h4" gutterBottom>
                Curriculum
            </Typography>
            {sections.map((section) => (
                <Box
                    key={section.id}
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '16px',
                        position: 'relative',
                        '&:hover .section-actions': {
                            opacity: 1,
                        },
                    }}
                >
                    {/* Section Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <Typography variant="h6" sx={{ marginRight: '8px' }}>
                            {section.title}
                        </Typography>
                        {editingSectionId === section.id ? (
                            <TextField
                                value={section.editableTitle}
                                onChange={(e) =>
                                    updateEditableSectionTitle(section.id, e.target.value)
                                }
                                onBlur={() => setEditingSectionId(null)}
                                variant="standard"
                                autoFocus
                                size="small"
                            />
                        ) : (
                            <Typography
                                variant="subtitle1"
                                onClick={() => setEditingSectionId(section.id)}
                                sx={{ cursor: 'pointer' }}
                            >
                                {section.editableTitle}
                            </Typography>
                        )}
                        <Box
                            className="section-actions"
                            sx={{
                                display: 'flex',
                                gap: '8px',
                                marginLeft: 'auto',
                                opacity: 0,
                                transition: 'opacity 0.2s ease-in-out',
                            }}
                        >
                            <IconButton onClick={() => setEditingSectionId(section.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => deleteSection(section.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Items */}
                    {section.items.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '12px',
                                marginBottom: '12px',
                                backgroundColor: '#f9f9f9',
                                position: 'relative',
                                '&:hover .item-actions': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {item.type}
                            </Typography>
                            {editingItemId === item.id ? (
                                <TextField
                                    value={item.title}
                                    onChange={(e) =>
                                        updateItemTitle(section.id, item.id, e.target.value)
                                    }
                                    onBlur={() => setEditingItemId(null)}
                                    variant="standard"
                                    autoFocus
                                    size="small"
                                />
                            ) : (
                                <Typography
                                    variant="body2"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => setEditingItemId(item.id)}
                                >
                                    {item.title}
                                </Typography>
                            )}
                            <Box
                                className="item-actions"
                                sx={{
                                    display: 'flex',
                                    gap: '8px',
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    opacity: 0,
                                    transition: 'opacity 0.2s ease-in-out',
                                }}
                            >
                                <IconButton
                                    onClick={() => setEditingItemId(item.id)}
                                    color="primary"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => deleteItem(section.id, item.id)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}

                    {/* Add Item Buttons */}
                    <Button
                        onClick={() => addItem(section.id, 'Lecture')}
                        variant="contained"
                        sx={{ marginRight: '8px' }}
                    >
                        + Lecture
                    </Button>
                    <Button
                        onClick={() => addItem(section.id, 'Quiz')}
                        variant="contained"
                        sx={{ marginRight: '8px' }}
                    >
                        + Quiz
                    </Button>
                    <Button
                        onClick={() => addItem(section.id, 'Coding Exercise')}
                        variant="contained"
                    >
                        + Coding Exercise
                    </Button>
                </Box>
            ))}
            <Button onClick={addSection} variant="contained">
                + Section
            </Button>
        </Box>
    );
};

export default App;
