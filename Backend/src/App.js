import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Profile from './Pages/Profile';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Signup1 from './Pages/Signup1';
import Login1 from './Pages/Login1';
import Footer from './Components/Footer/Footer.jsx';
import RestaurantDetail from "./Pages/RestaurantDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/login.jsx";
import SignupForm from './Pages/signup.jsx';
import DeliveryOrders from './Pages/orderpage.jsx';

import GpsTracking from "./Pages/GpsTracking"; // Import GPS Tracking Page
import DonationHistory from "./Pages/aharDonationHistory.jsx";
import Tracking from "./Pages/deliveryagent/tracking";
import NGOs from "./Pages/ngo_home.jsx";
import DeliveryHome from './Pages/deliveryagent/home_main.jsx';

// Layout component to control Navbar/Footer visibility
function Layout({ children }) {
    const location = useLocation();

    // Define routes where Navbar & Footer should NOT be displayed
    const hiddenRoutes = ["/delivery/login", "/delivery/signup" , "/delivery/DeliveryOrders" , "/aharDonationHistory"];

    return (
        <>
            {!hiddenRoutes.includes(location.pathname) && <Navbar />}
            
            <main>{children}</main>

            {!hiddenRoutes.includes(location.pathname) && <Footer />}

            <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} closeOnClick theme='colored'/>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Profile' element={<Profile />} />
                    <Route path='/NGOs' element={<AboutUs />} />
                    <Route path='/Volunteers' element={<ContactUs />} />
                    <Route path='/Signup1' element={<Signup1 />} />
                    <Route path='/Login1' element={<Login1 />} />
                    <Route path="/restaurant-detail" element={<RestaurantDetail />} />
                    <Route path="/delivery/login" element={<Login />} />
                    <Route path="/delivery/signup" element={<SignupForm />} />
                    <Route path="/delivery/DeliveryOrders" element={<DeliveryOrders />} />
                    <Route path="/gps-tracking" element={<GpsTracking />} />
                    <Route path="/aharDonationHistory" element={<DonationHistory />} />
                    <Route path="/tracking" element={<Tracking />} />
                    <Route path="/ngo_home" element={<NGOs />} />
                    <Route path="/home_main" element={<DeliveryHome />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
