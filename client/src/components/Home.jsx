import React from 'react';
import '../style/home.css';

function Home() {
  return (
      <div style={{display:'flex', flexDirection:'row', alignItems:'center' }} className='home'>
        <div className='container'>
          <h1 className='font-weight-light'>This is the homepage of my Colladit
            Editor</h1>
          <p>
            Hey there 👋. Thank you for using this (not) great Editor.<br/>
            I am Mike 👨‍💼. And I am the Developer of Colladit (I named it
            because of <b>Colla</b>borative and E<b>dit</b>or)<br/>
            I hope you have fun using it. If you find any bugs, please just
            ignore them.<br/>
            Nobody wants to use something working properly, you know?
            <br/><br/>
            greeting and out <br/> Mike
          </p>
          <img
              src={'https://i.kym-cdn.com/entries/icons/mobile/000/031/003/cover3.jpg'}
              alt={'Mike'}/>
        </div>
        <div style={{textAlign:'center'}}><a onMouseOver={()=>{
          new Audio('dorime.mp3').play();
        }} href={document.location.origin + '/session'}><img src={"https://i.ytimg.com/vi/ZLiN2Js1UtQ/sddefault.jpg"} alt={"door"}/></a></div>
      </div>
  );
}

export default Home;
