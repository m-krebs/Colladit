import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import '../../style/editor.css';
import {useParams} from 'react-router-dom';

const modules = {
  toolbar: [{ 'font': 'Arial'}, 'bold', 'italic', 'underline', {'direction': 'ltl'}, {'direction': 'ctl'}, {'direction': 'rtl'}]
}

export default function Editor() {
  let { sessionSlug } = useParams();
  const [value, setValue] = useState('');

  return <div className={'quill-container'}><a href={'http://localhost:3001/session?id=' + sessionSlug} target={'_blank'} rel={'noopener noreferrer'}><p>{sessionSlug}</p></a><ReactQuill theme="snow" value={value} onChange={setValue} modules={modules}/></div>;
}