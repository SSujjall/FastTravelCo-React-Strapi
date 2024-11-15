import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DestinationDetail from "./pages/DestinationDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />

        {/* If route is incorrect then it shows the 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
