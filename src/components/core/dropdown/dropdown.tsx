import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DropdownContainer } from './dropdown.styles.ts';

interface DropdownProps {
  label: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (value: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
  return (
    <DropdownContainer>
      <FormControl fullWidth variant='standard'>
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          value={value}
          onChange={(e) => onChange(e.target.value as string | number)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DropdownContainer>
  );
};

export default Dropdown;
