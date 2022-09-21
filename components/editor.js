import styles from "../styles/Home.module.css";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {darcula} from '@uiw/codemirror-theme-darcula';
import React from "react";

export default function Editor() {
    const onChange = React.useCallback((value, viewUpdate) => {
        console.log('value:', value);
    }, []);
    return (
        <section className={styles.codemirror}>
            <CodeMirror
                value="console.log('Thank You for using Colladit!');"
                height="85vh"
                extensions={[javascript({jsx: true})]}
                theme={darcula}
                onChange={onChange}
            /></section>
    )
}