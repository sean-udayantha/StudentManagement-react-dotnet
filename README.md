# Student Management-react-dotnet

 Student Management  is a comprehensive web application designed for managing Student within an organization. This app provides features for adding, editing, and deleting Student.

## Tech Stack
- **Frontend**: React.js with Material-UI for a modern and responsive user interface.
- **Backend**: .NET Core for a robust and scalable server-side implementation.
- **Database**: MySQL for efficient data storage and management.
- **Additional Tools**: 
  - Vite for fast development builds.
  - React Router for routing.
  - React-Toastify for user notifications.

## Features
- **Student Management**: Add, edit, and delete Student records with detailed information.
- **Real-Time Updates**: Interactive tables and forms for immediate data updates.
- **Responsive Design**: Optimized for desktop and mobile use.

## Installation

1. **Clone the repository**:
   ```bash
   git clone 
   cd StudentManagement-react-dotnet

   ```
   
2. **steup frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
3. **steup backend**:
   ```bash
   cd path/to/backend/StudentManagementSystemAPI
   dotnet restore
   "ConnectionStrings": { "DefaultConnection": "Server=your-server;Database=your-database;User=your-user;Password=your-password;"}
   dotnet ef database update
   dotnet run
   ```
