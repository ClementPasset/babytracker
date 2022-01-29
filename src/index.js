import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Charts from './pages/Charts';
import './style/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

let routes = [
  {
    path: '/',
    exact: true,
    component: <Home />
  },
  {
    path: '/charts',
    exact: true,
    component: <Charts />
  }
];

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <main>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route key={`routes-${index}`} exact={route.exact} path={route.path} element={route.component} />
            );
          })}
        </Routes>
      </main>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
