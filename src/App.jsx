import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AllData from "./Components/AllData";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import CreateAccount from "./Components/CreateAccount";
import Login from "./Components/Login";
import Home from "./Components/Home";
import "./styles/App.css";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <div className="container-xxl d-flex flex-column min-vh-100">
            <Navbar />
            <main className="container flex-grow-1 my-4">
              <Routes>
                <Route path="/all-data" element={<AllData />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="" element={<Home />} />
                <Route path="/index.html" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
