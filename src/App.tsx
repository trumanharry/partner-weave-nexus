
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Hospitals from "./pages/Hospitals";
import Users from "./pages/Users";
import Contacts from "./pages/Contacts";
import Physicians from "./pages/Physicians";
import Import from "./pages/Import";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/companies"
            element={
              <MainLayout>
                <Companies />
              </MainLayout>
            }
          />
          <Route
            path="/hospitals"
            element={
              <MainLayout>
                <Hospitals />
              </MainLayout>
            }
          />
          <Route
            path="/users"
            element={
              <MainLayout>
                <Users />
              </MainLayout>
            }
          />
          <Route
            path="/contacts"
            element={
              <MainLayout>
                <Contacts />
              </MainLayout>
            }
          />
          <Route
            path="/physicians"
            element={
              <MainLayout>
                <Physicians />
              </MainLayout>
            }
          />
          <Route
            path="/import"
            element={
              <MainLayout>
                <Import />
              </MainLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <MainLayout>
                <Reports />
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
