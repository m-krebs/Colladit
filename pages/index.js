import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
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
                    <button onClick={show} className={"pr-3 pt-2"}><Image src={"/share.svg"} alt={"Share"} height={"20px"}
                                                                     width={"20px"}
                                                                     className={styles.shareIcon}/></button>
                    <div id={"shareTextItem"} style={{display:"none"}}>
                        <p className={"mr-3"}></p><a className={"text-xl text-gray-300 font-bold"}
                                                                          href={"http://localhost:3000"}
                                                                          target={"_blank"}
                                                                          rel={"noopener noreferrer"}>https://generated.link/blablabla</a>
                    </div>
                    {/*<button className={styles.btn__ctc}><Image src={"/ctc.svg"} height={"20px"} width={"20px"}
                                                               alt={"CopyToClipboard"}
                                                               onClick={copyToClipboard}></Image></button>*/}
                </div>
                <img src={"/copied.svg"} alt={"Copied"} className={"h-50 w-100"}/>
                <p className={"bg-gray-500 p-2 top-20 z-1 absolute"}><i>Copied</i></p>
            </main>
            <Editor/>
        </div>
    )
}

async function copyToClipboard() {
    let link = "http://localhost:3000"
    await navigator.clipboard.writeText(link);
}

function show() {
    let e = document.getElementById("shareTextItem");
    if (e.style.display === "none") {
        e.style.display = "flex";
    } else {
        e.style.display = "none";
    }
    copyToClipboard().then()
}