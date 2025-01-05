// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
const UpdateStudentModal = ({ open, handleClose, student, onSave, mode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    age: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && student) {
      setFormData(student);
    } else if (mode === 'add') {
     
      setFormData({  firstName: '', lastName: '', address: '', age: '' });
    }
    setErrors({}); 
  }, [mode, student]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim() && mode === 'add') {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim() && mode === 'add') {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.age || isNaN(formData.age) || formData.age <= 0 || formData.age >= 100) {
      newErrors.age = 'Valid Age is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        onSave(formData);
        handleClose();
    }
    // if(mode === 'add'){
    // }else if(mode === 'edit'){
    //         onSave(formData);
    //         handleClose();
    // }
  
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          {mode === 'edit' ? 'Update Student' : 'Add Student'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={mode === 'edit'}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={mode === 'edit'}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.age}
            helperText={errors.age}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleClose} fullWidth sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              {mode === 'edit' ? 'Update' : 'Add'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateStudentModal;
