import './App.css';
import HomePage from './pages/home';
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <HomePage />
      </div>
    </SnackbarProvider>
  );
}

export default App;
