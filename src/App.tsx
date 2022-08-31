import RouteList from './routes/Routelist';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './context/UserContext';

function App() {
  return (
    <div className="App container mx-auto w-screen h-vh">
      <UserProvider>
        <Router>
          <RouteList />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
