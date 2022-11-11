import React from 'react';
import {Outlet} from 'react-router-dom';
import '../../style/session.css';
import {v4} from 'uuid';

function joinExSession() {
  let url = document.getElementById("url").value;
  if(url.includes('/')) {
    console.log("is with slash: " + url)
    window.open(url, '_self');
  } else {
    console.log("is only uuid: " + url)
    window.open(window.location.origin + '/session/' + url, '_self');
  }
}

function createNewSession() {
  let uuid = v4();
  window.open(window.location.origin + '/session/' + uuid,
      '_self');
  fetch('http://localhost:3001/api/session/' + uuid, {
    method: 'POST',
  }).then();
}

function links() {
  // if ((document.location.href).substring(document.location.origin.length) ===
  //     '/session') {
  return (<div className={'s-container'}>
    <div className={'wrapper'}>
      <div className={'exSession'}>
        <h3>Existing Session</h3>
        <label htmlFor="url">Paste link or session-ID: </label>
        <br/>
        <input id="url" type={'text'}/>
        <button onClick={joinExSession}>Send</button>
      </div>
      <div className={'newSession'}>
        <h3>New Session</h3>
        <button onClick={
          createNewSession
        }>CREATE
        </button>
      </div>
    </div>
  </div>);
  // }
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