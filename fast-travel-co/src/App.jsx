import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DestinationDetail from "./pages/DestinationDetail";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import PrivateRoute from "./pages/PrivateRoute";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/destination/:documentId"
          element={<DestinationDetail />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

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
    </BrowserRouter>
  );
}

export default App;
