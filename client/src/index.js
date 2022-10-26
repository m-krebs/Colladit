import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {
  Navigation,
  Home,
  Session,
} from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/session" element={<Session/>}>
          <Route path=":sessionSlug" element={<Session/>}/>
        </Route>
      </Routes>
    </Router>,
);