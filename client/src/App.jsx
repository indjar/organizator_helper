import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from "./components/AuthProvider"
import './App.css';
import { Nav } from "./organisms/Nav"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
      </AuthProvider>
    </Router>
  );
}

export default App;
