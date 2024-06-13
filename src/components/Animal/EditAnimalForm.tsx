import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateAnimal } from '../../services/api'; // Adjust API function
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Animal } from '../../pages/AnimalsPage';

interface EditAnimalFormProps {
    animal: Animal;
    onClose: () => void;
    onUpdateAnimal: (updatedAnimal: Animal) => void;
}

const EditAnimalForm: React.FC<EditAnimalFormProps> = ({ animal, onClose, onUpdateAnimal }) => {
    const formik = useFormik({
        initialValues: {
            id: animal.id,
            name: animal.name,
            type: animal.type,
            age: animal.age,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            type: Yup.string().oneOf(['cat', 'dog', 'other']).required('Type is required'),
            age: Yup.number().positive('Age must be a positive number').required('Age is required'),
        }),
        onSubmit: async (values) => {
            const updatedAnimal = await updateAnimal(values.id, values); // Adjust API call
            onUpdateAnimal(updatedAnimal); // Pass updated animal data to parent component
            onClose(); // Close the form
        },
    });

    const handleClose = () => {
        onClose(); // Close the form without updating
    };

    return (
        <div>
            <IconButton
                aria-label="close"
                style={{ float: 'right', marginTop: '-20px', marginRight: '-18px' }}
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
            <form onSubmit={formik.handleSubmit} style={{ marginBottom: '20px', position: 'relative' }}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    style={{ marginRight: '10px' }}
                />
                <FormControl variant="outlined" style={{ marginRight: '10px', minWidth: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        label="Type"
                    >
                        <MenuItem value="cat">Cat</MenuItem>
                        <MenuItem value="dog">Dog</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Age"
                    name="age"
                    type="number"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    error={formik.touched.age && Boolean(formik.errors.age)}
                    helperText={formik.touched.age && formik.errors.age}
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Update Animal
                </Button>
            </form>
        </div>
    );
};

export default EditAnimalForm;
