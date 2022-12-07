import React, {useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../style/editor.css';
import {validate} from 'uuid';

const Font = Quill.import('formats/font');
const Size = Quill.import('attributors/style/size');
Font.whitelist = ['helvn', 'arial', 'sansserif', 'comic', 'helve', 'verda'];
Size.whitelist = [
  '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '48px'];
Quill.register(Font, true);
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{'font': Font.whitelist}], [{'size': Size.whitelist}], [
      'bold', 'italic', 'underline'], [
      {'direction': 'rtl'}]],
};
let valid = true;

let ws;
if (validate(window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1))) {
  ws = new WebSocket('ws://10.0.206.4:8080?uuid=' +
      window.location.href.substring(
          window.location.href.lastIndexOf('/') + 1));
  ws.addEventListener('open', () => {
    ws.send('');
  });
} else {
  valid = false;
}

async function copyUrlToClipboard() {
  await navigator.clipboard.writeText(window.location.href);
  alert('copied url to clipboard');
}

function Editor() {
  const [value, setValue] = useState('');
  if (!valid) return <div><p className={'notValid'}>URL not valid</p></div>;
  ws.onmessage = (event) => {
    console.log('received: ' + event.data);
    setValue(event.data);
  };

  function handleEditChanges(e) {
    ws.send(e);
    setValue(e);
  }

  function downloadTxt() {

    console.log();
    let filename = window.prompt('Enter the filename', 'MyFileName');
    if (filename == null) return;
    if (filename === '' || filename === 'MyFileName') {
      let tstmp = new Date(Date.now());
      filename = `colladit_${tstmp.getDate()}-${tstmp.getMonth() +
      1}-${tstmp.getFullYear()} ${tstmp.getHours()}-${tstmp.getMinutes()}.txt`;
    } else {
      filename = filename + '.txt';
    }

    let a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(
        new Blob([document.getElementById('r-quill').innerText],
            {type: 'text/text'}));

    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  }

  return <>
    <div className={'quill-container'}>
      <div className={'opt-container'}>
        <button onClick={copyUrlToClipboard} className={'s-btn'}>Share this
          session
        </button>
        <button onClick={downloadTxt} className={'s-btn'}
                style={{float: 'right'}}><>Download text
          <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
               width='12' height='12'
               viewBox='0 0 50 50'>
            <path
                d='M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z M 15 22 L 15 24 L 35 24 L 35 22 Z M 15 28 L 15 30 L 31 30 L 31 28 Z M 15 34 L 15 36 L 35 36 L 35 34 Z'></path>
          </svg>
        </>
        </button>
      </div>
      <ReactQuill id={'r-quill'} theme='snow'
                  modules={modules} value={value} onChange={handleEditChanges}/>
    </div>
  </>;
}

export default Editor;
