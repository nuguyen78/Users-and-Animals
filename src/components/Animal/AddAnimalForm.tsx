import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createAnimal } from '../../services/api';
import {
    TextField, Button, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { Animal } from "../../pages/AnimalsPage";

interface AddAnimalFormProps {
    onAddAnimal: (animal: Animal) => void; // Callback to add new animal
}

const AddAnimalForm: React.FC<AddAnimalFormProps> = ({ onAddAnimal }) => {
    // Initialize Formik for form management
    const formik = useFormik({
        initialValues: {
            name: '',      // Initial value for animal's name
            type: 'cat',   // Initial value for animal's type
            age: 0,        // Initial value for animal's age
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'), // Name field validation
            type: Yup.string().oneOf(['cat', 'dog', 'other']).required('Type is required'), // Type field validation
            age: Yup.number().positive('Age must be a positive number').required('Age is required'), // Age field validation
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const newAnimal = await createAnimal(values); // API call to create a new animal
                resetForm();
                onAddAnimal(newAnimal); // Pass newly created animal to parent component
            } catch (error) {
                console.error('Error adding animal:', error); // Log error if API call fails
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ marginBottom: '20px' }}>
            {/* Name field */}
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
            {/* Type dropdown */}
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
            {/* Age field */}
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
            {/* Submit button */}
            <Button variant="contained" color="primary" type="submit">
                Add Animal
            </Button>
        </form>
    );
};

export default AddAnimalForm;
