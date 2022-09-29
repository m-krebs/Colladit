import styles from "../styles/Home.module.css";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {darcula} from '@uiw/codemirror-theme-darcula';
import React from "react";

export default function Editor() {
    const onChange = React.useCallback((value) => {
        console.log('value:', value);
    }, []);
    return (
        <section className={styles.codemirror}>
            <div className={styles.toolbar}>
                <select name={"fontStyle"}></select>
                <select name={"fontSize"}></select>
            </div>
            <CodeMirror
                placeholder={"Share the Link to work collaborative. Already shared? Then have fun typing"}
                height="85vh"
                extensions={[javascript({jsx: true})]}
                theme={darcula}
                onChange={onChange}
            /></section>
    )
}