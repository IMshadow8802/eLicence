import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import EditActiveStatus from "./components/EditActiveStatus";
import "./App.css";
import EditLicense from "./components/EditLicence";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/editActive" element={<EditActiveStatus />} />
          <Route path="/editLicence" element={<EditLicense />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
