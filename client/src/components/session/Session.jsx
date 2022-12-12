import React from 'react';
import {Outlet} from 'react-router-dom';
import '../../style/session.css';
import {v4, validate} from 'uuid';

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

function createNewSession() {
  let uuid = v4();
  window.open(window.location.origin + '/session/' + uuid,
      '_self');
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
          <input id='url' type={'text'} value={'33eba49c-ee59-4b1c-94f4-410db84e65d3'}/>
          <button id={'go'} onClick={joinExSession}>Go</button>
          <div id={'cname'} className={'emsg'}></div>
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
      <div className='home'>
        <div className='container'>
          {checkInSession()}
          <Outlet/>
        </div>
      </div>
  );
}

export default Session;