import React, {useContext, useEffect, useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
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
ws.addEventListener('open', (event) => {
  ws.send('');
});

ws.addEventListener('message', (event) => {
  console.log('received: ', event.data);
});

export default function Editor() {
  return <div className={'quill-container'}>
    <ReactQuill theme="snow"
                modules={modules}/></div>;
}