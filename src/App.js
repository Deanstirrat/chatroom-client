import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth } from './components/AuthProvider'; // Import the useAuth hook
import Login from './pages/login';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <Dashboard /> : <Login /> }
    </div>
  );
}

export default App;
