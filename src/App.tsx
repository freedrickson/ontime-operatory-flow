import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Index from "./pages/Index";
import Build from "./pages/Build";
import Manage from "./pages/Manage";
import Analyze from "./pages/Analyze";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback";
import ConfirmSave from "./pages/ConfirmSave";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary fallback={<div className="min-h-screen flex items-center justify-center text-center p-8"><div><h1 className="text-2xl font-bold mb-4">Something went wrong</h1><p>Please refresh the page to continue.</p></div></div>}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/build" element={<Build />} />
              <Route path="/manage" element={<Manage />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/confirm/save" element={<ConfirmSave />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
