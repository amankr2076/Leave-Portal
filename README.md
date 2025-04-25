# 🚀 CampusLeave – A Leave Taking Portal

A full-stack web application designed to simplify and digitize the student leave application process at the college level. CampusLeave enables students to apply for leave online, generate a printable leave form in PDF format, and track the application status in real-time. Admin staff can manage all applications, update statuses, and send notifications directly to students.

---

## 📘 Overview and Introduction

In many colleges, leave applications are still managed manually, resulting in delays, errors, and a lack of transparency. This project provides a digital solution to that problem by offering a centralized platform for leave management.

With **CampusLeave**, students can:
- Apply for leave by submitting an online form.
- Generate a PDF of their leave application.
- Track their leave status.
- Maintain a history of all previous leaves.

Admins can:
- View and verify all student leave applications.
- Update application status (approve/reject).
- Automatically send email notifications to students.
- Maintain records of all leave applications digitally.

---

## Interface

- **HomePage**:
  
    ![Alt Text](https://github.com/amankr2076/Leave-Portal/blob/main/Images/HomePage.png)

- **Admin Dashboard**

    ![Alt Text](https://github.com/amankr2076/Leave-Portal/blob/main/Images/AdminDashboard.png)

- **New Application**

    ![Alt Text](https://github.com/amankr2076/Leave-Portal/blob/main/Images/NewApplicationPage.png)

- **Add Student Page**

    ![Alt Text](https://github.com/amankr2076/Leave-Portal/blob/main/Images/AddStudentPage.png)





  ---






## 🧩 System Architecture
The system is composed of three main layers: **Frontend**, **Backend**, and **Database**.

### ⚛️ Frontend
The frontend provides a user-friendly interface for all stakeholders, ensuring that faculty and administrators can access relevant data with ease. 
    
- **Technology Stack**:  
  - React.js for building dynamic and responsive user interfaces.  
  - Redux for state management to handle complex application data flows.  
  - CSS and Tailwind CSS for modern, responsive, and visually appealing designs.

- **Features**:  
  - Role-based dashboards for faculty and administrators.  
  - Clean, intuitive design for effortless navigation.  
  - Integration with the backend for real-time data synchronization.
  - Handles routing, authentication (via JWT), and UI state management

### 🔧 Backend
  The backend is responsible for handling business logic, processing user requests, and ensuring secure data transactions.  

- **Technology Stack**:  
  - Node.js and Express.js for building a fast, scalable server.  
  - MySQL for a relational and structured database design.  
  - JWT (JSON Web Tokens) for secure authentication and session management.
  - Uses **Nodemailer** for sending email notifications.

- **Features**:  
  - API endpoints to manage research and consultancy data.  
  - Secure user authentication and authorization.  
  - Role-based access to data for faculty and administrators. 


### 🗄️ Database
  The database is structured to maintain the relationships between Admin, Students, applications. 
- **Features**: 
  - Stores user details, leave applications, departments, and leave types
  - Uses foreign key relationships to maintain data integrity

---

## 🎨 Frontend Functionalities

- Student login via college email
- Apply for leave with date range, reason, contact info, and nature of leave
- Generate a downloadable PDF of the leave form
- View all previous leave applications
- Track application status (Pending/Approved/Rejected)
- Forgot password flow with email-based reset (optional)

---

## 🛠 Backend Functionalities

- JWT-based authentication and authorization
- APIs for leave submission, leave history, and status tracking
- Admin-specific routes to view all student applications and update status
- Automatic email notifications using **SMTP / Nodemailer**
- Secure CORS configuration between frontend and backend
- Dynamic PDF generation for student applications
- Role-based access control for students and admins

---


## Installation Steps  

### Prerequisites  
Ensure the following are installed on your system:  
- Node.js (latest stable version)  
- MySQL server (configured and running)  
- Git

  
### Installation Commands  

- **Install all dependencies**  
   ```bash  
   npm install
   ```
- **To run the server**
  ```bash
   npm run dev
  ```
- **To run the client**
  ```bash
  npm start
  ```
4. **Access the Application**
  - Open your browser and navigate to http://localhost:3000 to view the portal.
