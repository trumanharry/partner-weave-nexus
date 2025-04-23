import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import PrivateRoute from "./components/auth/PrivateRoute";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";

// Import pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Hospitals from "./pages/Hospitals";
import Physicians from "./pages/Physicians";
import Contacts from "./pages/Contacts";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Import from "./pages/Import";
import Settings from "./pages/Settings";
import Testing from "./pages/Testing";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import PendingAccount from "./pages/PendingAccount";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/pending" element={<PendingAccount />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Outlet />
                </MainLayout>
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="companies" element={<Companies />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="physicians" element={<Physicians />} />
            <Route path="contacts" element={<Contacts />} />
            <Route 
              path="users" 
              element={
                <PrivateRoute requireAdmin={true}>
                  <Users />
                </PrivateRoute>
              } 
            />
            <Route path="reports" element={<Reports />} />
            <Route path="import" element={<Import />} />
            <Route path="settings" element={<Settings />} />
            <Route path="testing" element={<Testing />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
