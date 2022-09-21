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
                    <div className={styles.shareText}>
                        <p className={"mr-3"}>Share to collaborate:</p><a className={""} href={"http://localhost:3000"}
                                                                          target={"_blank"}
                                                                          rel={"noopener noreferrer"}>https://generated.link/blablabla</a>
                    </div>
                    <Image src={"/share.svg"} alt={"Share"} height={"20px"} width={"20px"}
                           className={styles.shareIcon}/>
                    <button className={styles.btn__ctc}><Image src={"/ctc.svg"} height={"20px"} width={"20px"}
                                                               alt={"CopyToClipboard"}
                                                               onClick={copyToClipboard}></Image></button>
                </div>
            </main>
            <Editor/>
        </div>
    )
}

async function copyToClipboard() {
    let link = "http://localhost:3000"
    await navigator.clipboard.writeText(link);
    // alert("Copied text " + link)
}