using StudentManagementSystemAPI.DataAccess;
using StudentManagementSystemAPI.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Register the repository for dependency injection.
builder.Services.AddScoped<IStudentRepository, StudentRepository>();

// Configure CORS to allow all origins
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Build the app.
var app = builder.Build();

// Check database connection during startup
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var dbChecker = new DatabaseConnectionChecker(connectionString);

var isDbConnected = await dbChecker.CheckConnectionAsync();
if (!isDbConnected)
{
    Console.WriteLine("Database connection failed. Exiting application...");
    return; // Exit the application if the database connection fails.
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Enable CORS middleware
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
