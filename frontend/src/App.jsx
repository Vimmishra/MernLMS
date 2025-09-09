import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import OtpVerify from "./pages/OtpVerify";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateNews from "./pages/admin/CreateNews";

import NewsPage from "./pages/NewsPage";
import AddBook from "./pages/admin/AddBooks";
import BorrowBook from "./pages/admin/BorrowBooks";
import ReturnBook from "./pages/admin/ReturnBook";
import StudentBorrowedBooks from "./pages/StudentBorrowedBooks";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AllUsersList from "./pages/admin/AllUsersList";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AboutUs from "./pages/AboutUs";
import BulkUploadBooks from "./pages/admin/BulkBookUpload";
import Books from "./pages/Books";
import AddUsers from "./pages/admin/AddUsers";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<OtpVerify />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Student/User Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <NewsPage />
          </ProtectedRoute>
        }
      />

   <Route
        path="/AboutUs"
        element={
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/my-borrows"
        element={
          <ProtectedRoute>
            <StudentBorrowedBooks />
          </ProtectedRoute>
        }
      />


      <Route
        path="/Books"
        element={
          <ProtectedRoute>
            <Books/>
          </ProtectedRoute>
        }
      />





      {/* Admin  Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />


<Route
        path="/admin/allusers"
        element={
          <AdminRoute>
            <AllUsersList />
          </AdminRoute>
        }
      />


      <Route
        path="/admin/add-students"
        element={
          <AdminRoute>
            <AddUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/create-news"
        element={
          <AdminRoute>
            <CreateNews />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/add-books"
        element={
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        }
      />
       <Route
        path="/admin/getAnalytics"
        element={
          <AdminRoute>
            <AdminAnalytics />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/add-BorrowBooks"
        element={
          <AdminRoute>
            <BorrowBook />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/return-BorrowBooks"
        element={
          <AdminRoute>
            <ReturnBook />
          </AdminRoute>
        }
      />
       <Route
        path="/admin/bulk-upload"
        element={
          <AdminRoute>
            <BulkUploadBooks/>
          </AdminRoute>
        }
      />

      {/* Redirect all unknown routes */}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
