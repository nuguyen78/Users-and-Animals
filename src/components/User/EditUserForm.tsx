import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../services/api';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../../pages/UsersPage';

interface EditUserFormProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (updatedUser: any) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose, onUpdateUser }) => {
  const formik = useFormik({
    initialValues: {
      id: user.id,
      name: user.name,
      gender: user.gender,
      banned: user.banned,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      gender: Yup.string().oneOf(['female', 'male', 'other']).required('Gender is required'),
      banned: Yup.boolean().required('Banned status is required'),
    }),
    onSubmit: async (values) => {
      await updateUser(values.id, values);
      onUpdateUser(values); // Pass updated user data to parent component
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
        style={{float: 'right', marginTop: '-20px', marginRight: '-18px'}}
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
        Update User
      </Button>
    </form>
    </div>
  );
};

export default EditUserForm;
