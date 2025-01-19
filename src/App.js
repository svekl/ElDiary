import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginView from "./components/LoginView";
import Homework from "./components/Homework";
import Note from "./components/Note";
import Diary from "./components/Diary";
import Schedule from "./components/Schedule";
import Settings from "./components/Settings";
import ScheduleCreate from "./components/SheduleCreate";
import Teachers from "./components/Teachers";
import Lessons from "./components/Lessons";
import Error404 from "./components/Error404";
import PrivateRoutes from "./router/PrivateRoutes";
import { AuthProvider } from "../src/utils/AuthContext";
import LoadData from "./components/LoadData";
import Grades from "./components/Grades";
import Quarters from "./components/Quarters";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <LoadData />
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Homework />} />
            <Route path="/homework" element={<Homework />} />
            <Route path="/note" element={<Note />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/weekShedule" element={<Schedule />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/scheduleCreate" element={<ScheduleCreate />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/quarters" element={<Quarters />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
