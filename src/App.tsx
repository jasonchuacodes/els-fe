import Routes from './routes/index';
import UserProvider from './context/UserContext';

function App() {
  return (
    <div className="App container mx-auto w-screen h-vh">
      <UserProvider>
        <Routes />
      </UserProvider>
    </div>
  );
}

export default App;
