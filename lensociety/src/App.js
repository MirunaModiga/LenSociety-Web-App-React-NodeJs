import Header from "./components/common/Header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import Footer from "./components/common/Footer/Footer"
import Service from "./components/services/Service"
import JoinUs from "./components/joinUs/JoinUs"
import SignUp from "./components/signup/SignUp"
import SignUpBuy from "./components/signup/Buyer/SignUpBuy"
import SignUpCon from "./components/signup/Contributor/SignUpCon"
import AboutUs from "./components/about/AboutUs"
import User from "./components/user/User"
import UploadWrapper from "./components/user/upload/upload-wrapper/UploadWrapper"
import Explore from "./components/explore/Explore"
import Settings from "./components/user/settings/Settings"
import Admin from "./components/admin/Admin"
import LogInCon from "./components/login/Contributor/LogInCon"
import LogInBuy from "./components/login/Buyer/LogInBuy"
import './App.css'
import PrivateRoute from "./components/common/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joinUs" element={<JoinUs />} />
          <Route path="/services" element={<Service />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/Contributor" element={<SignUpCon />} />
          <Route path="/signup/Buyer" element={<SignUpBuy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login/Contributor" element={<LogInCon />} />
          <Route path="/login/Buyer" element={<LogInBuy />} />
          <Route element={<PrivateRoute />} >
            <Route path="/user" element={<User />} />
            <Route path="/user/upload/upload-wrapper" element={<UploadWrapper />} />
            <Route path="/user/settings" element={<Settings />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
