import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from "./Main";
import Navbar from './Navbar';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Main />
    </BrowserRouter>
  );
}

export default App;