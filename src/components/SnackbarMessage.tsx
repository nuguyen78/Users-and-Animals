import React from 'react';
import Snackbar from '@mui/material/Snackbar';

interface SnackbarMessageProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
    onClose: () => void;
}

const SnackbarMessage: React.FC<SnackbarMessageProps> = ({ open, message, severity, onClose }) => {
    return (
    <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        message={message}
        ContentProps={{
            style: {
                backgroundColor: severity === 'success' ? '#4caf50' : '#f44336',
                color: '#ffffff',
                textAlign: 'center',
            },
        }}
    />
    );
};

export default SnackbarMessage;
