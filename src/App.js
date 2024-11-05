import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./components/views/Home";
import TaskList from "./components/views/List";
import Notification from "./components/views/Notification";
import TopHeader from "./components/TopHeader";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="containe">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="all-content">
            {/* <TopHeader/> */}
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/tasklist" element={<TaskList />}></Route>
              <Route path="/notification" element={<Notification />}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
