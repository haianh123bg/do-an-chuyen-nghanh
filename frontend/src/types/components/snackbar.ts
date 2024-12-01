export interface SnackbarProps {
    open: boolean;
    content: string;
    severity: 'error' | 'info' | 'warning' | 'success';
}
