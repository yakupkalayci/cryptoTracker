import axios from "axios";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({coins}) {
  return (
    <div className={styles.container}>
    </div>
  );
}

export async function getStaticProps() {
  const {data} = await axios.get("https://api.coincap.io/v2/assets");

  return {
    props: {
      coins: data.data,
    },
  }
}
