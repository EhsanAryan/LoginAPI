import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from "./Main";
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import dataStore from '../redux/dataStore';


const App = () => {
  return (
    <Provider store={dataStore}>
      <BrowserRouter>
        <Navbar />
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;