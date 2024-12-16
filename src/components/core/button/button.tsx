import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

interface CoreButtonProps {
    variant: 'text' | 'outlined' | 'contained';
    color: 'inherit' | 'primary' | 'secondary' | 'default';
    onClick: () => void;
    children: ReactNode;
    customPadding?: string;
    [key: string]: any;
}

const CoreButton: React.FC<CoreButtonProps> = ({ variant, color, onClick, children, customPadding, ...props }) => {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
            {...props}
            style={{ padding: customPadding ? customPadding : '10px 20px' }}
        >
            {children}
        </Button>
    );
};

export default CoreButton;