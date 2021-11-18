import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import TrackerTable from './components/TrackerTable';
import './style/style.css';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <main>
      <TrackerTable />
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);
