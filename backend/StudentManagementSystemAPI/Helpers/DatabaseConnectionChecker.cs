using MySql.Data.MySqlClient;
using System;
using System.Threading.Tasks;

namespace StudentManagementSystemAPI.Helpers
{
    public class DatabaseConnectionChecker
    {
        private readonly string _connectionString;

        public DatabaseConnectionChecker(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> CheckConnectionAsync()
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    Console.WriteLine("Database connection is successful.");
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database connection failed: {ex.Message}");
                return false;
            }
        }
    }
}
