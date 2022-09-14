import RouteList from './routes/Routelist';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './context/UserContext';
import LessonProvider from './context/LessonContext';

function App() {
  return (
    <div className="App container mx-auto w-screen h-vh">
      <UserProvider>
        <LessonProvider>
          <Router>
            <RouteList />
          </Router>
        </LessonProvider>
      </UserProvider>
    </div>
  );
}

export default App;
