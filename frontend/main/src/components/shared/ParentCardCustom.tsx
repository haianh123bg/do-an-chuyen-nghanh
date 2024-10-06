// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardContent, Divider, Box } from '@mui/material';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';

type Props = {
    title: string;
    footer?: string | JSX.Element;
    children: JSX.Element;
    divider: boolean;
};

const ParentCardCustom = ({ title, children, footer, divider }: Props) => {
    const customizer = useSelector((state: AppState) => state.customizer);

    const theme = useTheme();
    const borderColor = theme.palette.divider;

    return (
        <Card
            sx={{
                padding: 0,
                height: '100%',
                border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none',
            }}
            elevation={customizer.isCardShadow ? 9 : 0}
            variant={!customizer.isCardShadow ? 'outlined' : undefined}
        >
            <CardHeader title={title} sx={{ padding: '30px 30px' }} />

            {divider && <Divider />}

            <CardContent>{children}</CardContent>
            {footer ? (
                <>
                    <Divider />
                    <Box p={3}>{footer}</Box>
                </>
            ) : (
                ''
            )}
        </Card>
    );
};

export default ParentCardCustom;
