import styles from "../styles/Editor.module.css";
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
                <button><img src={"/assets/img/bold.svg"} alt={"Mark text bold"}/></button>
                <button><img src={"/assets/img/italic.svg"} alt={"Mark text bold"}/></button>
                <button><img src={"/assets/img/underline.svg"} alt={"Mark text bold"}/></button>
                <select name={"fontFamily"}></select>
                <select name={"fontSize"}></select>
                <input type={"color"} name={"fontColor"}/>
                <button><img src={"/assets/img/alignl.svg"} alt={"Mark text bold"}/></button>
                <button><img src={"/assets/img/alignc.svg"} alt={"Mark text bold"}/></button>
                <button><img src={"/assets/img/alignr.svg"} alt={"Mark text bold"}/></button>
            </div>
            <CodeMirror
                placeholder={"Share the Link to work collaborative. Already shared? Then have fun typing"}
                height="85vh"
                extensions={[javascript()]}
                theme={darcula}
                onChange={onChange}
            /></section>
    )
}