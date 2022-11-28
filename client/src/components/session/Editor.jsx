import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../style/editor.css';
import {validate} from 'uuid';

const modules = {
  toolbar: [
    [{'font': ['arial']}],
    [
      'bold',
      'italic',
      'underline'],
    [
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
  let obj = document.getElementById("tn-box");
  obj.style.display = "block";
  obj.style.opacity = "100%";
}

function Editor() {
  const [value, setValue] = useState('');
  if (!valid) return <div><p className={'notValid'}>URL not valid</p></div>;
  ws.onmessage = (event) => {
    console.log('received: ' + event.data);
    setValue(event.data);
  };

  function handleEditChanges(e) {
    console.log('send: ' + e);
    ws.send(e);
    setValue(e);
  }

  return <div className={'quill-container'}>
    <div className={"opt-container"}><button onClick={copyUrlToClipboard}>Share this session</button>
    <div id={"tn-box"} className={"tn-box tn-box-color-1"}>
      <p>Copied URL</p>
      <div className={"tn-progress"}></div>
    </div>
    </div>
    <ReactQuill theme="snow"
                modules={modules} value={value} onChange={handleEditChanges}/>
  </div>;
}

export default Editor;