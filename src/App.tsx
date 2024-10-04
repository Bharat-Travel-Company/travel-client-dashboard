import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PropertyListing from "@/pages/PropertyListing";
import CarServiceListing from "@/pages/CarServiceListing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { ForgotPasswordPage } from "./components/forgot-password";
import IndividualCarListing from "@/components/cabServicesListing/individualListing";

function App() {
  // const role = localStorage.getItem("role");
  return (
    <Router>
      <div className="flex items-center justify-center h-full min-h-dvh w-full">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/hotel-details" element={<PropertyListing />} />
          <Route path="/car-service-listing" element={<CarServiceListing />} />
          <Route
            path="/car-service-listing/individual"
            element={<IndividualCarListing />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
