import React from 'react';
import {Outlet} from 'react-router-dom';
import '../../style/session.css';
import {v4, validate} from 'uuid';

// Joins existing Sessions
function joinExSession() {
  let input = document.getElementById('url');
  let error = document.getElementById('cname');
  if (!validate(input.value)) {
    input.classList.add('err');
    error.innerHTML = 'Must be valid UUID';
  } else {
    input.classList.remove('err');
    error.innerHTML = '';
    window.open(window.location.origin + '/session/' + input.value, '_self');
  }
}

async function createNewSession() {
  let uuid = v4();
  let overlay = document.createElement('div');
  let loader = document.createElement('div');
  overlay.className += 'overlay';
  loader.className += 'loader';
  overlay.appendChild(loader);
  document.body.appendChild(overlay);
  setTimeout(() => {
    window.open(window.location.origin + '/session/' + uuid,
        '_self');
  }, 500);
}

function checkInSession() {
  if ((document.location.href).substring(document.location.origin.length) ===
      '/session') {
    return (<div className={'s-container'}>
      <div className={'wrapper'}>
        <div className={'exSession'}>
          <h3>Existing Session</h3>
          <label htmlFor='url'>Paste session-ID: </label>
          <br/>
          <input id='url' type={'text'}/>
          <button id={'go'} onClick={joinExSession}>Go</button>
          <div id={'cname'} className={'eMsg'}></div>
        </div>
        <div className={'newSession'}>
          <h3>New Session</h3>
          <button className={'btnNS'} onClick={
            createNewSession
          }>CREATE
          </button>
        </div>
      </div>
    </div>);
  }
}

function Session() {
  return (
      <div className='home' id={'home'}>
        <div className='container'>
          {checkInSession()}
          {/* Outlet renders children routes */}
          <Outlet/>
        </div>
      </div>
  );
}

export default Session;
