import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HotelDetailsComponent from "@/components/hotel-details";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { ForgotPasswordPage } from "./components/forgot-password";

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center h-full min-h-dvh w-full">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/hotel-details" element={<HotelDetailsComponent />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
