import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from "./components/AuthProvider"
import './App.css';
import { Nav } from "./organisms/Nav"
import { Register } from './pages/Register';
import { Login } from './pages/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
