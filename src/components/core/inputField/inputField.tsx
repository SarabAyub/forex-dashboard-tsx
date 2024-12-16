import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    [key: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text', ...props }) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            type={type}
            variant="outlined"
            fullWidth
            {...props}
        />
    );
};

export default InputField;