import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import {
  Navigation,
  Home,
  Session,
  Editor,
  SessionList,
} from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div id={'app'}>
      <Router>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/session' element={<Session/>}>
            <Route path=':sessionSlug' element={<Editor/>}/>
            <Route path={'/session/all'} element={<SessionList/>}/>
          </Route>
        </Routes>
      </Router>,
    </div>,
);