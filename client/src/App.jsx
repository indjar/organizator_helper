import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { AuthProvider } from "./components/AuthProvider"
import './App.css';
import { Nav } from "./organisms/Nav"
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Events } from './pages/Events';
import { AddEvent } from './pages/AddEvent';
import { AddParticipant } from "./pages/AddParticipants";
import { Participants } from "./pages/Participants";
import { AddParticipantsEvent } from "./pages/AddParticipantEvent";
import { ParticipantEvents } from "./pages/ParticipantsEvents";
import { Home } from "./pages/Home";
import { Footers } from "./organisms/Footer";
import { WrongPage } from "./pages/WrongPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path='/events' element={<Events />}></Route>
          <Route path='/add_event' element={<AddEvent />}></Route>
          <Route path='/add_participant' element={<AddParticipant />}></Route>
          <Route path='/participants' element={<Participants />}></Route>
          <Route path='/addToEventList' element={<AddParticipantsEvent />}></Route>
          <Route path='/eventList' element={<ParticipantEvents />}></Route>
          <Route path='/404' element={<WrongPage />}></Route>
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <Footers />
      </AuthProvider>
    </Router>
  );
}

export default App;
