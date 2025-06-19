import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./app.css";
import { SignIn } from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
