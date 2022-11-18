import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../style/editor.css';

const modules = {
  toolbar: [
    [{'font': ['Arial']}],
    [
      'bold',
      'italic',
      'underline'],
    [
      {'direction': 'ltl'},
      {'direction': 'ctl'},
      {'direction': 'rtl'}]],
};

const ws = new WebSocket('ws://localhost:8080?uuid=' +
    window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
ws.addEventListener('open', () => {
  ws.send('');
});

export default function Editor() {
  ws.onmessage = (event) => {
    console.log('received: ' + event.data);
    setValue(event.data);
  };
  const [value, setValue] = useState('');

  function handleEditChanges(e) {
    console.log('send: ' + e);
    setValue(e);
    ws.send(e);
  }

  return <div className={'quill-container'}>
    <ReactQuill theme="snow"
                modules={modules} value={value} onChange={handleEditChanges}/>
  </div>;
}