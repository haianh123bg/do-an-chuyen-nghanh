import { Box, ToggleButton, ToggleButtonGroup, TextField } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [formats, setFormats] = useState<string[]>([]);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
    if (!textRef.current) return;

    const textarea = textRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = value;
    const formatMap: Record<string, (text: string) => string> = {
      bold: (text) => `**${text}**`,
      italic: (text) => `_${text}_`,
      bullet: (text) => text.split('\n').map(line => `• ${line}`).join('\n'),
      number: (text) => text.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n')
    };

    newFormats.forEach(format => {
      if (formatMap[format]) {
        const formattedText = formatMap[format](selectedText);
        newText = value.substring(0, start) + formattedText + value.substring(end);
      }
    });

    onChange(newText);
    setFormats([]);
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        size="small"
        sx={{ mb: 1 }}
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton value="bullet" aria-label="bullet list">
          <FormatListBulletedIcon />
        </ToggleButton>
        <ToggleButton value="number" aria-label="number list">
          <FormatListNumberedIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      <TextField
        inputRef={textRef}
        multiline
        fullWidth
        minRows={10}
        maxRows={15}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          '& .MuiInputBase-root': {
            fontFamily: 'monospace',
            fontSize: '14px',
          }
        }}
      />
    </Box>
  );
}

