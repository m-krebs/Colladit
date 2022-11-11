import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../style/editor.css';

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
  const [value, setValue] = useState('');

  return <div className={'quill-container'}>
    <ReactQuill theme="snow" value={value} onChange={setValue}
                modules={modules}/></div>;
}