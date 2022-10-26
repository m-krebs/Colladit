import React from 'react';
import {Outlet} from 'react-router-dom';
import '../../style/session.css';

function Session() {
  return (
      <div className="home">
        <div className="container">
          <h1 className="title">Thank You for using Colladit</h1>
          <div className={'s-container'}>
            <div>
              <h3>Existing Session</h3>
              <label htmlFor="url">Paste link or session-ID: </label>
              <br/>
              <input id="url" type={'text'}/>
              <button>Send</button>
            </div>
            <div>
              <h3>New Session</h3>
              <button onClick={function(){
                window.open('http://localhost:3000/session'.concat('/a'),
                    '_self');
              }}>CREATE
              </button>
            </div>
          </div>
          <Outlet/>
        </div>
      </div>
  );
}

export default Session;