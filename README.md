# Student Assignment Dashboard

A simple web dashboard built with React and Tailwind CSS where professors can create assignments and students can view and submit them.

## Setup Steps

### Prerequisites
- Node.js (version 18 or above)
- npm

### How to Run Locally
```bash
# 1. Clone the project
git clone https://github.com/Shashank-Thapliyal/Assignment-Review-Dashboard.git
cd Assignment-Review-Dashboard

# 2. Install packages
npm install

# 3. Start the project
npm run dev
```
Open `http://localhost:5173` in your browser.

### Other Commands
- `npm run build` — Builds the app for production
- `npm run lint` — Checks for code errors with oxlint

---

## Folder Structure

```
src/
├── assets/                  # Icons and images
├── components/
│   ├── common/              # Small shared components like Brand logo
│   └── layout/              # Navbar (Topbar) and page layout (DashboardLayout)
├── context/
│   ├── AuthContext.jsx      # Stores the currently logged-in user
│   ├── authContext.js       # Context definition
│   ├── AssignmentContext.jsx# Stores assignments, submissions, and handles localStorage
│   └── assignmentContext.js # Context definition
├── data/
│   ├── seedData.js          # Demo accounts (2 professors and 5 students)
│   └── seedAssignments.js   # Sample assignments and submissions
├── features/
│   ├── auth/                # Login page with role switcher
│   ├── student/             # Student dashboard, filters, and submission popup
│   └── admin/               # Professor dashboard, assignment cards, and form popup
├── hooks/
│   ├── useAuth.jsx          # Simple hook to use AuthContext
│   └── useAssignments.jsx   # Simple hook to use AssignmentContext
├── routes/
│   ├── AppRoutes.jsx        # App pages and routes
│   └── ProtectedRoute.jsx   # Makes sure students and professors can't open each other's pages
├── utils/
│   └── assignmentUtils.js   # Helper functions for dates, overdue checks, and progress math
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point that wraps the app with Context providers
└── index.css                # Tailwind CSS styles
```

---

## Component Architecture

```
                       [ App ]
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
      [ LoginPage ]            [ DashboardLayout ]
                                        │
                                   [ Topbar ]
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
               [ StudentDashboard ]           [ AdminDashboard ]
                         │                             │
                         ▼                      ┌──────┴──────┐
                [ Confirm Modal ]               ▼             ▼
                                        [ AssignmentCard ]  [ AssignmentModal ]
                                                │
                                                ▼
                                      [ Student Status List ]
```

- **`AuthContext`:** Keeps track of who is currently logged in and provides simple `login` and `logout` functions.
- **`AssignmentContext`:** Holds the list of assignments and submissions. Provides functions to add, edit, delete, and submit assignments, and automatically saves them to `localStorage`.
- **`StudentDashboard`:** Shows the student's assignments, an overall progress bar ("X of Y submitted"), search bar, filter buttons (All, Pending, Submitted, Overdue), and the confirmation popup.
- **`AdminDashboard`:** Shows the professor's assignments, a search bar, and handles the "Create Assignment" button.
- **`AssignmentCard`:** Displays one assignment with its title, description, due date, Drive link, class completion bar, edit/delete buttons, and an expandable table of student statuses.
- **`AssignmentModal`:** A popup form used to create or edit an assignment and choose which students to assign it to.

---

## Key Design Decisions

1. **Role-based view using simple filters:**
   Instead of a complex backend, we filter the data based on who is logged in. Students only see assignments where their ID is included in `assignedTo`, and professors only see assignments where `createdBy` matches their ID. Protected routes redirect users if they try to visit the wrong page.

2. **Keeping data separate:**
   Assignments and submissions are stored as two separate arrays. When a professor deletes an assignment, we also delete its submissions so there is no leftover data in `localStorage`. When an assignment is edited, student submissions are kept safe.

3. **Two-step submission confirmation:**
   Since this app tracks submissions rather than hosting file uploads directly, students click "Yes, I have submitted", and then a popup appears explaining that this confirms they uploaded their work to Google Drive. Once confirmed, their status changes to "Submitted" and the progress bar updates right away.

4. **Saving data in `localStorage`:**
   We use React's `useEffect` to save assignments and submissions to `localStorage` whenever they change. If `localStorage` is empty (like the first time the app is opened), it loads default sample data. This makes sure refreshing the page does not reset user actions.

5. **Simple and responsive UI:**
   Built using basic Tailwind CSS utility classes. Modals and tables are scrollable so the app looks clean and works well on mobile phones as well as laptops.
