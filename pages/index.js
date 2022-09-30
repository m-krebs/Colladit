import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import React from 'react';
import Editor from "../components/editor";

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
            <Editor/>

            <div className="bg-green-100 p-5 w-full sm:w-1/2 rounded">
                <div className="flex justify-between">
                    <div className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             className="flex-none fill-current text-green-500 h-4 w-4">
                            <path
                                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/>
                        </svg>
                        <div className="flex-1 leading-tight text-sm text-green-700 font-medium">Copied Link</div>
                    </div>
                    <button className={styles.closeDialog}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         className="flex-none fill-current text-green-600 h-3 w-3">
                        <path
                            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                    </svg></button>
                </div>
            </div>
        </div>
    )
}

async function copyToClipboard() {
    let link = "http://localhost:3000"
    await navigator.clipboard.writeText(link);
    let e = document.getElementById("popup_copied");
    e.style.display = "flex"
    setTimeout(()=>e.style.display="none", 1500)
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