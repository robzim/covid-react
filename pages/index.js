import styles from "../styles/Home.module.css";
import Head from "next/head";
import Header from "./Header";
import NewStuffList from "./NewStuffList";
import ZinnoFooter from "./ZinnoFooter";
import FavColor from "./FavColor";
// import ZinnoIframe from "./ZinnoIframe";
import CovidInfo from "./CovidInfo";
// import MapChartExample from "./MapChartExample";
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
