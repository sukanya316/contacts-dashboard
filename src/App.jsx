import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './assets/components/Home';
import EditContact from './assets/components/EditContact';
import CreateContact from './assets/components/CreateContact';
import ChartsAndMaps from './assets/components/ChartsAndMaps';
import './App.css';

const App=()=>(
  <BrowserRouter >
  <Routes>
    <Route path="/contacts" Component={Home}/>
    <Route exact path="/create-contact" Component={CreateContact}/>
    <Route exact path="/edit-contact/:id" Component={EditContact}/>
    <Route exact path="/charts-and-maps" Component={ChartsAndMaps}/>
  </Routes>
  </BrowserRouter>
)
export default App