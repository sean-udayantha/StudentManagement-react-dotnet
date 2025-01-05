import  { useState, useEffect, useCallback } from "react";
import { Container, Typography,CircularProgress } from "@mui/material";
import StudentTable from "./StudentTable";
import { addStudent, DeleteStudent, getStudent, UpdateStudent } from "../services/student";
import { toast } from "react-toastify";

const StudentMainPage = () => {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // get all students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
         const response = await getStudent();
         setStudentList(response);
       } catch (err) {
         setError('Failed to load Student');
         console.error(err);
       } finally {
      setLoading(false);
    }
  }, []);

  // add  new student
  const insertStudent = async (student) => {
    try {
      const response = await addStudent(student);
      if (!response.status == 201) throw new Error("Failed to add student");
      await fetchStudents();
      toast.success('Student added successfully!');
    } catch (err) {
      console.error('Error adding Student:', err);
    }
  };

  // Delete student
  const deleteStudent = async (studentId) => {
    try {
      const response = await DeleteStudent(studentId);
      if (!response.status == 200) throw new Error("Failed to delete student");
      await fetchStudents();
      toast.success('Student deleted successfully!');
    } catch (err) {
        console.error('Error delete Student:', err);
    }
  };

  // Update  student
  const updateStudent = async (studentId, updates) => {
    try {
      const response = await UpdateStudent(studentId, updates);
      if (!response.status == 200) throw new Error("Failed to update student");
      await fetchStudents();
      toast.success('Student updated successfully!');
    } catch (err) {
        console.error('Error updated Student:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <StudentTable
          studentList={studentList}
          onDelete={deleteStudent}
          onUpdate={updateStudent}
          onInsert={insertStudent}
        />
      )}
    </Container>
  );
};

export default StudentMainPage;
