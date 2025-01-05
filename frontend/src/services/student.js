import axiosInstance from "./axiosInstance";

// Get all student
export const getStudent = async () => {
    try {
      const response = await axiosInstance.get('/student');
      return response.data;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };
  


  // Add a new employee
  export const addStudent = async (studentData) => {
    try {
      const response = await axiosInstance.post('/student', studentData);
      return response;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  };
  
  // Update an employee
  export const UpdateStudent = async (id, studentData) => {
    try {
      const response = await axiosInstance.put(`/student/${id}`, studentData);
      return response;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  };
  
  // Delete an employee
  export const DeleteStudent = async (id) => {
    try {
        const response =  await axiosInstance.delete(`/student/${id}`);
        return response;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  };
  