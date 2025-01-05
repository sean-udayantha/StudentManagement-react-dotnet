/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

 
const DeleteConfirmationModal = ({ open, handleClose, onDeleteCheck, student}) => {
  console.log("🚀 ~ DeleteConfirmationModal ~ student:", student)
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
          Confirm Delete
        </Typography>
         <Typography variant="body1" mb={3}>
         Are you sure you want to delete the student {student?.firstName} {student?.lastName}?
         </Typography>
        <Button
          variant="contained"
          color="secondary" 
          onClick={() => onDeleteCheck(student.studentID)}
          style={{ marginRight: '8px' }}
        >
          Delete
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
