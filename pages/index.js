import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import React from 'react';
import Editor from "../components/editor";
import SuccessDialog from "../components/dialogs/successDialog";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Colladit - Home</title>
                <meta name="description" content="Colladit the great collaborative editor"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>

                <div className={styles.share}>
                    <button onClick={show} className={"pr-3 pt-2"}><Image src={"/assets/img/share.svg"} alt={"Share"}
                                                                          height={"20px"}
                                                                          width={"20px"}
                                                                          className={styles.shareIcon}/></button>
                    <div id={"shareTextItem"} style={{display: "none"}}>
                        <p className={"mr-3"}></p>
                        <a className={"text-xl text-gray-300 font-bold"}
                           href={"http://localhost:3000"}
                           target={"_blank"}
                           rel={"noopener noreferrer"}>https://generated.link/blablabla</a>
                    </div>
                </div>
                <p id={"popup_copied"} className={styles.copied_popup}>Copied</p>
            </main>
            <SuccessDialog/>
            <Editor/>
        </div>
    )
}

async function copyToClipboard() {
    let link = "http://localhost:3000"
    await navigator.clipboard.writeText(link);
    let e = document.getElementById("SuccessDialog");
    e.style.display = "flex"
    setTimeout(()=>e.style.display="none", 4000)
}

let shareTimeout;

function show() {
    let isOpen = true;
    let e = document.getElementById("shareTextItem");
    if (e.style.display === "none") {
        isOpen = false;
        e.style.display = "flex";
    } else {
        e.style.display = "none";
    }
    if (!isOpen) copyToClipboard().then()
    clearTimeout(shareTimeout)
    shareTimeout = setTimeout(()=>e.style.display="none", 10000)
}