using StudentManagementSystemAPI.Models;

namespace StudentManagementSystemAPI.DataAccess
{
    public interface IStudentRepository
    {
        Task<IEnumerable<Student>> GetAllStudents();
        Task AddStudent(Student student);
        Task UpdateStudent(int studentID, string address, int age);
        Task DeleteStudent(int studentID);
        Task<Student> GetStudentById(int studentID);
    }
}
