import RouteList from './routes/Routelist';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <div className="App container mx-auto w-screen h-vh">
        <Router>
          <RouteList />
        </Router>
    </div>
  );
}

export default App;
