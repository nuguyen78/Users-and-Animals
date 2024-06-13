import React from 'react';
import { TextField, Button } from '@mui/material';

interface FilterProps {
    filter: string;
    setFilter: (filter: string) => void;
    label?: string;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter, label = "Filter by name" }) => {
    return (
        <div>
            <TextField
                label={label}
                variant="outlined"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" onClick={() => setFilter('')} style={{ marginLeft: '10px' }}>
                Clear Filter
            </Button>
        </div>
    );
};

export default Filter;
