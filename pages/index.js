import styles from "../styles/Home.module.css";
import Head from "next/head";
import Header from "./Header";
import ZinnoFooter from "./ZinnoFooter";
import CovidInfo from "./CovidInfo";
import { ConfidentialityRequiredError } from "ldapjs";
import { Divider } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zinnno</title>
        <meta name="description" content="rob zinno app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <Divider orientation="horizontal" />
        <div className={styles.grid}>
          <Divider orientation="horizontal" />
          <CovidInfo />
        </div>
      </main>
      <footer className={styles.footer}>
        <ZinnoFooter />
      </footer>
    </div>
  );
}
