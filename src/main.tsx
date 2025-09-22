import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/app" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
  </Router>
);
