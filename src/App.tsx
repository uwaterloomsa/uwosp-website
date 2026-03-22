import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CmsProvider } from "./components/CmsProvider";
import Home from "./pages/Home";
import About from "./pages/About";
import Orphans from "./pages/Orphans";
import Campaigns from "./pages/Campaigns";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import History from "./pages/History";
import FAQs from "./pages/FAQs";
import Finances from "./pages/Finances";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Events from "./pages/Events";
import Volunteer from "./pages/Volunteer";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CmsProvider>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/orphans" element={<Orphans />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/history" element={<History />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/finances" element={<Finances />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/events" element={<Events />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CmsProvider>
    </BrowserRouter>
  );
}

export default App;
