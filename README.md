# MERN Stack Application: Admin Dashboard with Agent Management and CSV Distribution

## **Overview**

This application is a MERN (MongoDB, Express.js, React.js, Node.js) stack-based solution designed to fulfill the following objectives:

1. **Admin User Login**: Secure authentication using JWT (JSON Web Tokens).
2. **Agent Creation & Management**: Add and manage agents with details like name, email, mobile number, and password.
3. **Uploading and Distributing Lists**: Upload CSV files containing lists of tasks, validate the file, and distribute the tasks equally among 5 agents.

---

## **Features**

### **1. User Login**
- Secure login with email and password.
- JWT-based authentication.
- Redirect to the dashboard on successful login.
- Error handling for invalid credentials.

### **2. Add Agents**
- Create agents with the following details:
  - Name
  - Email
  - Mobile Number (with country code)
  - Password
- Store agent details in MongoDB.

### **3. Upload CSV and Distribute Lists**
- Upload CSV files with the following columns:
  - `FirstName` (Text)
  - `Phone` (Number)
  - `Notes` (Text)
- Validate file format (accepts `.csv`, `.xlsx`, and `.xls`).
- Distribute tasks equally among 5 agents.
  - If the total number of tasks is not divisible by 5, distribute the remaining tasks sequentially.
- Save distributed lists in MongoDB.
- Display distributed lists for each agent on the frontend.

---

## **Technical Stack**

- **Frontend**: React.js / Next.js
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: CSV and Excel file handling

---

## **Setup and Installation**

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or cloud-based)
- NPM or Yarn

### **Steps to Run the Application**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>

2. **Install Dependencies**

Navigate to the backend folder and install dependencies:

  cd backend
  npm install

Navigate to the frontend folder and install dependencies:

cd ../frontend
npm install

3. **Set Up Environment Variables**

Create a .env file in the backend folder with the following variables:

env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
PORT=5000

4. **Create a .env file in the frontend folder (if needed) for any frontend-specific configurations.**

Start the Backend Server

Navigate to the backend folder and run:

npm start
The backend server will start at http://localhost:5000.

5. **Start the Frontend Application**

Navigate to the frontend folder and run:

npm start
The frontend application will start at http://localhost:3000.

## Deployment Instructions

### Backend Deployment (Render)

1. Go to [Render](https://render.com/) → Create a **Web Service**.
2. Connect your GitHub repository containing the backend code.
3. Set the **Root Directory** to `backend/`.
4. Set environment variables: .env file
5. Choose **Node** and the branch you want to deploy.
6. Deploy.  
Example backend URL: `https://agent-backend.onrender.com`

---

### Frontend Deployment 

1. Go to [Vercel](https://vercel.com/) → **New Project** → Import your frontend repository from GitHub.
2. Set **Framework Preset** to **React**.
3. Set environment variable to connect frontend to backend: 'REACT_APP_API_URL=https://agent-backend.onrender.com'(example)
4. Click **Deploy**.  
Example frontend URL: `https://your-frontend.vercel.app`

---

## Notes

- Make sure **CORS** is enabled in the backend to allow requests from your frontend domain.
- Update API calls in frontend to use `REACT_APP_API_URL`.
- Test login and dashboard after deployment to confirm everything works.

## Backend URL:
https://machine-mern-b-zbgj.onrender.com
