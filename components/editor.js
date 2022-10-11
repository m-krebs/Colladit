import styles from "../styles/Editor.module.css";
import React from "react";
import useCodeMirror from "../public/js/useCodeMirror";

const MyCodeMirror = () => {
    const { ref } = useCodeMirror();
    return <div ref={ref} className={styles.codemirror}/>
}

export default function Editor() {
    return (
        <section className={styles.codemirror}>
            <div className={styles.toolbar}>
                <button><img src={"/assets/img/bold.svg"} alt={"Make text bold"}/></button>
                <button><img src={"/assets/img/italic.svg"} alt={"Make text italic"}/></button>
                <button><img src={"/assets/img/underline.svg"} alt={"Underline text"}/></button>
                <select name={"fontFamily"}></select>
                <div className={styles.fontSize}>
                    <select name={"fontSize"}>
                        <option value={"14"}>14</option>
                    </select>
                    <input type={"text"} name={"fontSize"}/>
                </div>
                <input className={styles.color_picker} type={"color"} name={"fontColor"}/>
                <button><img src={"/assets/img/alignl.svg"} alt={"Mark text bold"}/></button>
                <button><img src={"/assets/img/alignc.svg"} alt={"Mark text bold"}/></button>
                <button><img src={"/assets/img/alignr.svg"} alt={"Mark text bold"}/></button>
            </div>
            <MyCodeMirror/>
        </section>
)
}