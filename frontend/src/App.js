import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import NotesState from './context/notes/NoteState';
import Home from './components/Home';
import SignOut from './components/SignOut';
import Signup from './components/Signup';
import Alerts from './components/Alerts';
function App() {
  return (
    <NotesState>
    <Router>
      <Navbar title="iNotes"/>
      <div className="container ">
      <Alerts/>
      <Routes>
        
        <Route path="/" element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signout' element={<SignOut/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      </div>
    </Router>
    </NotesState>
  );
}

export default App;
