Frontend
🚀 Frontend Dashboard Project

This is a React-based multi-role dashboard system designed for different users of the application.

It contains separate dashboards for different roles:

* User
* Admin
* Manager
* Agent
* Super Admin



👨‍💻 Team Work Distribution

Each team member is responsible for one or more dashboards:

Madhuri → User Dashboard
Ranjit  → Admin Dashboard + Super Admin Dashboard
Prajakta → Manager Dashboard
Shreyash  → Agent Dashboard

Each person works only inside their assigned dashboard folder.


 🧠 Project Overview

The project is structured in a modular format where each dashboard is independent but part of the same system.



 📁 Project Structure

src/
 ├── user/              → User Dashboard (Madhuri)
 ├── admin/             → Admin Dashboard (Ranjit)
 ├── manager/           → Manager Dashboard (Prajakta)
 ├── agent/             → Agent Dashboard (Shreyash)
 ├── superadmin/        → Super Admin Dashboard (Ranjit)
 ├── components/        → Shared components
 ├── styles/
 │     └── global.css   → Global styling file
 ├── App.jsx            → Main routing file
 └── index.js           → Entry point




 🎨 Global Styling

All common styles are written in:

src/styles/global.css
This includes:

 Layout styling
 Common UI design
 Theme colors
 Reusable classes



 🏠 Homepage Flow

The homepage acts as the entry point of the application.
It:

 Opens first when app runs
 Routes users to different dashboards
 Controlled through `App.jsx`



 ⚙️ App.jsx (Main Controller)

App.jsx handles:

 Routing between dashboards
  Loading different role-based screens
 Navigation flow of the application

 📊 Dashboard & Tech Structure Table

This table shows what each dashboard contains and what is used inside.

 🧩 Dashboard Structure Overview

| Dashboard             | Owner    | What it contains                         | Main files/folders inside                                 |
| --------------------- | -------- | ---------------------------------------- | --------------------------------------------------------- |
| User Dashboard        | Madhuri  | User profile, user features, basic UI    | src/user/ → components, pages, user UI logic              |
| Admin Dashboard       | Ranjit   | Admin control panel, management UI       | src/admin/ → components, admin panels, control features   |
| Manager Dashboard     | Prajakta | Reports, team monitoring, analytics      | src/manager/ → components, reports, manager views         |
| Agent Dashboard       | Shreyash | Task handling, assigned work tracking    | src/agent/ → components, task UI, work tracking           |
| Super Admin Dashboard | Ranjit   | Full system control, high-level settings | src/superadmin/ → components, system control features     |


 🎨 Shared Project Parts

| Part       | Purpose                                       | Location                |
| ---------- | --------------------------------------------- | ----------------------- |
| Global CSS | Common styling for entire app                 | src/styles/global.css   |
| App.jsx    | Main routing controller for dashboards        | src/App.jsx             |
| Components | Reusable UI components used in all dashboards | src/components/         |
| Index file | Entry point of application                    | src/index.js            |



 🔄 How Everything Connects

 Each dashboard works independently inside its folder
 App.jsx controls which dashboard is shown
 Global CSS applies common design everywhere
 Components are reused across dashboards


 🔄 Application Flow

id="flow003"
App starts
   ↓
Homepage loads
   ↓
User selects role
   ↓
App.jsx routes to dashboard
   ↓
Specific dashboard opens:
   → User / Admin / Manager / Agent / Super Admin



 📌 Dashboard Responsibilities

 👤 User Dashboard (Madhuri)

 User profile UI
 User features
 Basic interactions



 🛠 Admin Dashboard (Ranjit)

 Admin control panel
 Management features
 System control UI


 📊 Manager Dashboard (Prajakta)

 Team monitoring
 Reports and analytics
 Manager-level controls



 🤖 Agent Dashboard (Shreyash)

 Task handling
 Assigned work tracking
 Execution features


 🔐 Super Admin Dashboard (Ranjit)

 Full system access
 High-level control
 System configuration


 📌 Key Features

 Role-based dashboard system
 Independent modular structure
 Shared global styling
 Central routing via App.jsx
 Scalable architecture

  ⚙️ How to Run Project

bash
npm install
npm run dev

The project will run on:
👉 http://localhost:5173

🔌 Backend Connectivity

 Frontend connects to backend using API calls (fetch / axios)
 Data is exchanged in JSON format
 Each dashboard fetches its own required data from backend APIs
 Backend must be running for full functionality

 🧰 Tech Stack

 React.js
 JavaScript
 HTML & CSS
 Axios / Fetch API
 React Router

 ⚙️ Requirements

 Node.js installed
 npm installed

🔄 Routing

React Router is used in App.jsx to navigate between different dashboards.

 🌐 Environment Variables

Backend API URLs are managed using .env file.

Example:
REACT_APP_API_URL=http://localhost:8080

 📦 Build (Optional)

For production build:

npm run build


 📍 Summary

This project is built to separate responsibilities clearly between team members while maintaining a single unified frontend system
