import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import NotFound from "./pages/NotFound";
import Index from "./pages/Home/Index";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DestinationDetail from "./pages/Users/DestinationDetail";
import Navbar from "./components/Shared/Navbar";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import PrivateRoute from "./Utils/PrivateRoute";
import Payment from "./pages/Users/Payment";
import MyBookings from "./pages/Users/MyBookings";
import Toast from "./components/Shared/Toast";
import FooterSection from "./components/Shared/Footer";

function App() {
  const [searchCriteria, setSearchCriteria] = useState({});

  return (
    <BrowserRouter>
      <Toast />
      <Navbar
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
      />
      <Routes>
        <Route path="/" element={<Index searchCriteria={searchCriteria} />} />
        <Route
          path="/destination/:documentId"
          element={<DestinationDetail />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/myBookings" element={<MyBookings />} />

        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />

        {/* If route is incorrect then it shows the 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}

export default App;
