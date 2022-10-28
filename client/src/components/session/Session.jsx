import React from 'react';
import {Outlet} from 'react-router-dom';
import '../../style/session.css';
import {v4 as uuid} from 'uuid';

function links() {
  if((document.location.href).substring(document.location.origin.length)==="/session"){
  return (<div className={'s-container'}>
    <div className={'wrapper'}>
      <div className={'exSession'}>
        <h3>Existing Session</h3>
        <label htmlFor="url">Paste link or session-ID: </label>
        <br/>
        <input id="url" type={'text'}/>
        <button>Send</button>
      </div>
      <div className={'newSession'}>
        <h3>New Session</h3>
        <button onClick={function() {
          window.open(window.location.origin + '/session/' + uuid(),
              '_self');
        }}>CREATE
        </button>
      </div>
    </div>
  </div>);}
}

function Session() {
  return (
      <div className="home">
        <div className="container">
          <h1 className="title">Thank You for using Colladit</h1>
          {links()}
          <Outlet/>
        </div>
      </div>
  );
}

export default Session;