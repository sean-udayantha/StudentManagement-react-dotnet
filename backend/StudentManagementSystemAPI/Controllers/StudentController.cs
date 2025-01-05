using Microsoft.AspNetCore.Mvc;
using StudentManagementSystemAPI.DataAccess;
using StudentManagementSystemAPI.Models;

namespace StudentManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;

        public StudentController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        
        /// Get all students.
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var students = await _studentRepository.GetAllStudents();
                if (students == null || !students.Any())
                    return Ok(new List<Student>());

                return Ok(students);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

  
        /// Add a new student.
        [HttpPost]
        public async Task<IActionResult> AddStudent([FromBody] Student student)
        {
            if (student == null)
                return BadRequest("Student data cannot be null.");

            if (string.IsNullOrWhiteSpace(student.FirstName) || string.IsNullOrWhiteSpace(student.LastName))
                return BadRequest("Student first name and last name are required.");

            try
            {
                await _studentRepository.AddStudent(student);
                return CreatedAtAction(nameof(GetAll), new { id = student.StudentID }, student);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// Update a student's address and age.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] StudentUpdateDto studentUpdateDto)
        {
            if (studentUpdateDto == null)
                return BadRequest("Student data cannot be null.");

            if (id <= 0)
                return BadRequest("Invalid student ID.");

            try
            {
                // Update the student
                await _studentRepository.UpdateStudent(id, studentUpdateDto.Address, studentUpdateDto.Age);

                // Retrieve the updated student details
                var updatedStudent = await _studentRepository.GetStudentById(id);

                if (updatedStudent == null)
                    return NotFound($"Student with ID {id} not found after update.");

                return Ok(updatedStudent);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Student with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        /// Delete a student by ID.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid student ID.");

            try
            {
                await _studentRepository.DeleteStudent(id);
                return Ok($"Student with ID {id} deleted successfully.");
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Student with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
