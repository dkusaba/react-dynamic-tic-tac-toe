import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import Home from './pages/Home.tsx';
import Game from './pages/Game.tsx';

const router = createBrowserRouter([
  {
    path: '/react-dynamic-tic-tac-toe/',
    element: <App />,
    children: [
      {
        path: '/react-dynamic-tic-tac-toe/',
        element: <Home />
      },
      {
        path: '/react-dynamic-tic-tac-toe/game',
        element: <Game />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
