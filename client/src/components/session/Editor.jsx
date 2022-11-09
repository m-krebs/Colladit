import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../style/editor.css';
import {useParams} from 'react-router-dom';

const modules = {
  toolbar: [
    {'font': 'Arial'},
    'bold',
    'italic',
    'underline',
    {'direction': 'ltl'},
    {'direction': 'ctl'},
    {'direction': 'rtl'}],
};

export default function Editor() {
  let {sessionSlug} = useParams();
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(value);
  });

  return <div className={'quill-container'}><a
      href={'http://localhost:3001/api/session?id=' + sessionSlug}
      target={'_blank'} rel={'noopener noreferrer'}><p>{sessionSlug}</p></a>
    <button onClick={function() {
      fetch('http://localhost:3001/api/session?id=' + sessionSlug, {
        method: 'POST',
        body: value,
      }).then((res) => {
        res.json().then(data => setValue(JSON.stringify(data)));
      });
    }
    }>Sync
    </button>
    <ReactQuill theme="snow" value={value} onChange={setValue}
                modules={modules}/></div>;
}