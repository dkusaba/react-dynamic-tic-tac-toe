import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/react-dynamic-tic-tac-toe/' element={<Home />} />
      <Route path='/react-dynamic-tic-tac-toe/game' element={<Game />} />
    </Routes>
  );
}

export default App;
