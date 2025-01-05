/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UpdateStudentModal from "./UpdateStudentModal";

// eslint-disable-next-line react/prop-types
const StudentTable = ({ studentList, onDelete, onUpdate, onInsert }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mode, setMode] = useState("add");

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setMode("edit");
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedStudent(null);
    setMode("add");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSave = (studentData) => {
    console.log("🚀 ~ handleSave ~ studentData:", studentData);
    if (mode === "edit") {
      // Update logic
      const updates = {
        address: studentData.address,
        age: studentData.age,
      };
      onUpdate(studentData.studentID, updates);
    } else if (mode === "add") {
      onInsert(studentData);
    }
    handleModalClose();
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setOpenDeleteModal(true);
  };
  const handleDelete = async (studentId) => {
    console.log("🚀 ~ handleDelete ~ studentId:", studentId);
    try {
      await onDelete(studentId);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => handleAddClick()}
        style={{ marginBottom: "16px" }}
      >
        Add New Student
      </Button>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Date Registered</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList?.map((student) => (
              <TableRow key={student.studentID}>
                <TableCell>{student.studentID}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.address}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>
                  {" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(new Date(student.dateRegistered))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => handleEditClick(student)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(student)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {modalOpen && (
        <UpdateStudentModal
          open={modalOpen}
          handleClose={handleModalClose}
          student={selectedStudent}
          onSave={handleSave}
          mode={mode}
        />
      )}

      <DeleteConfirmationModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        onDeleteCheck={handleDelete}
        student={selectedStudent}
      />
    </>
  );
};

export default StudentTable;
