import React, {useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../style/editor.css';
import {validate} from 'uuid';

// Configure quill editor options
class PreserveWhiteSpace {
  constructor(quill) {
    quill.container.style.whiteSpace = 'pre-line';
  }
}

const Font = Quill.import('formats/font');
const Size = Quill.import('attributors/style/size');
Font.whitelist = ['helve', 'arial', 'sansserif', 'comic', 'verda'];
Size.whitelist = [
  '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '48px'];
Quill.register('modules/preserveWhiteSpace', PreserveWhiteSpace);
Quill.register(Font, true);
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{'font': Font.whitelist}],
    [{'size': Size.whitelist}],
    [{'color': ['Yellow', 'Green', 'Blue', 'Violet', 'Red', 'Orange']}],
    ['bold', 'italic', 'underline'],
    [
      {'align': ''}, {'align': 'center'}, {'align': 'right'}]],
};

let isUrlValid = true;
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
  isUrlValid = false;
}

// handler for copy_url button
async function copyUrlToClipboard() {
  await navigator.clipboard.writeText(window.location.href);
  alert('copied url to clipboard');
}

function Editor() {
  const [value, setValue] = useState('');
  // Checks URL; if not valid renders div with error
  if (!isUrlValid) return <div><p className={'notValid'}>URL not valid</p>
  </div>;
  ws.onmessage = (event) => {
    console.log('received: ' + event.data);
    setValue(event.data);
  };


  // Download
  function downloadTxt() {
    // Define Filename
    let filename = window.prompt('Enter the filename', 'MyFileName');
    if (filename == null) return;
    if (filename === '' || filename === 'MyFileName') {
      let timestamp = new Date(Date.now());
      filename = `colladit_${timestamp.getDate()}-${timestamp.getMonth() +
      1}-${timestamp.getFullYear()} ${timestamp.getHours()}-${timestamp.getMinutes()}.txt`;
    } else {
      filename = filename + '.txt';
    }

    // Create Temporary Link to download the text
    let anchorElement = window.document.createElement('a');
    anchorElement.href = window.URL.createObjectURL(
        new Blob([document.getElementById('r-quill').innerText],
            {type: 'text/text'}));
    anchorElement.download = filename;
    console.log(anchorElement.href);

    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
  }

  function handleEditChanges(change) {
    let nLine = '<p><br></p>';
    setValue(change);
    // Append new line if user presses Enter
    change = change.slice(-11) === nLine ? change + nLine : change;
    ws.send(change);
  }

  return <>
    <div className={'quill-container'}>
      <div className={'opt-container'}>
        <button onClick={copyUrlToClipboard} className={'s-btn'}>Share this
          session
        </button>
        <button onClick={downloadTxt} className={'s-btn r-btn'}
                style={{float: 'right'}}>
          <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
               width='24' height='24'
               viewBox='0 0 24 24'>
            <path
                d='M 12 4 C 9.6655084 4 7.7006133 5.2494956 6.4296875 7.0136719 C 2.8854572 7.05389 0 9.9465993 0 13.5 C 0 17.078268 2.9217323 20 6.5 20 L 18.5 20 C 21.525577 20 24 17.525577 24 14.5 C 24 11.509638 21.577034 9.0762027 18.599609 9.0195312 C 17.729938 6.1415745 15.152096 4 12 4 z M 12 6 C 14.504527 6 16.55398 7.825491 16.931641 10.214844 L 17.083984 11.175781 L 18.048828 11.050781 C 18.272182 11.021699 18.414903 11 18.5 11 C 20.444423 11 22 12.555577 22 14.5 C 22 16.444423 20.444423 18 18.5 18 L 6.5 18 C 4.0022677 18 2 15.997732 2 13.5 C 2 11.002268 4.0022677 9 6.5 9 C 6.534993 9 6.6164592 9.0069899 6.75 9.0136719 L 7.3613281 9.0449219 L 7.6660156 8.5136719 C 8.5301088 7.0123517 10.137881 6 12 6 z M 11 9 L 11 13 L 8 13 L 12 17 L 16 13 L 13 13 L 13 9 L 11 9 z'></path>
          </svg>

        </button>
      </div>
      <ReactQuill id={'r-quill'} theme='snow'
                  modules={modules} value={value} onChange={handleEditChanges}
                  preserveWhitespace={true}/>
    </div>
  </>;
}

export default Editor;
