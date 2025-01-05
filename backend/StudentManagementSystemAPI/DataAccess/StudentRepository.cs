using Dapper;
using MySql.Data.MySqlClient;
using StudentManagementSystemAPI.Models;
using System.Data;

namespace StudentManagementSystemAPI.DataAccess
{
    public class StudentRepository : IStudentRepository
    {
        private readonly string _connectionString;

        public StudentRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<Student>> GetAllStudents()
        {
            try
            {
                using var connection = new MySqlConnection(_connectionString);
                return await connection.QueryAsync<Student>(
                    "GetAllStudents",
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAllStudents: {ex.Message}");
                throw;
            }
        }

        public async Task AddStudent(Student student)
        {
            try
            {
                using var connection = new MySqlConnection(_connectionString);
                var parameters = new
                {
                    //studentID = student.StudentID,
                    firstName = student.FirstName,
                    lastName = student.LastName,
                    address = student.Address,
                    age = student.Age
                };

                await connection.ExecuteAsync(
                    "InsertStudent",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddStudent: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateStudent(int p_StudentID, string p_Address, int p_Age)
        {
            try
            {
                using var connection = new MySqlConnection(_connectionString);
                var parameters = new
                {
                    p_StudentID,
                    p_Address,
                    p_Age
                };

                await connection.ExecuteAsync(
                    "UpdateStudent",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateStudent: {ex.Message}");
                throw;
            }
        }

        public async Task DeleteStudent(int p_StudentID)
        {
            try
            {
                using var connection = new MySqlConnection(_connectionString);
                var parameters = new { p_StudentID };

                await connection.ExecuteAsync(
                    "DeleteStudent",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in DeleteStudent: {ex.Message}");
                throw;
            }
        }

        public async Task<Student> GetStudentById(int p_StudentID)
        {
            try
            {
                using var connection = new MySqlConnection(_connectionString);
                var parameters = new { p_StudentID };

                return await connection.QueryFirstOrDefaultAsync<Student>(
                    "GetStudentById",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetStudentById: {ex.Message}");
                throw;
            }
        }

    }
}
