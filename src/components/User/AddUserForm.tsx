import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createUser} from '../../services/api';
import {
    TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
} from '@mui/material';
import {User} from "../../pages/UsersPage";


interface AddUserFormProps {
    onAddUser: (user: User) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            gender: 'female',
            banned: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            gender: Yup.string().oneOf(['female', 'male', 'other']).required('Gender is required'),
            banned: Yup.boolean().required('Banned status is required'),
        }),
        onSubmit: async (values, {resetForm}) => {
                const newUser = await createUser(values);
                resetForm();
                onAddUser(newUser); // Add the new user to the state
        },
    });

    return (
        <>
        <form onSubmit={formik.handleSubmit} style={{marginBottom: '20px'}}>
            <TextField
                label="Name"
                name="name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                style={{marginRight: '10px'}}
            />
            <FormControl variant="outlined" style={{marginRight: '10px', minWidth: 120}}>
                <InputLabel>Gender</InputLabel>
                <Select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    label="Gender"
                >
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                control={
                    <Checkbox
                        name="banned"
                        checked={formik.values.banned}
                        onChange={formik.handleChange}
                        color="primary"
                    />
                }
                label="Banned"
            />
            <Button variant="contained" color="primary" type="submit">
                Add User
            </Button>
        </form>
    </>
    );
};

export default AddUserForm;
