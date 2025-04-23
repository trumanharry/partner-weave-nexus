
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="hospitals" element={<Hospitals />} />
          <Route path="physicians" element={<Physicians />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="import" element={<Import />} />
          <Route path="settings" element={<Settings />} />
          <Route path="testing" element={<Testing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
