import axios from "axios";
import Coin from "../components/Coin";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({coins}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1>CryptoTracker</h1>  
        </div>
        
        <div className={styles.searchContainer}>
          <div>
            <input 
            type="text"
            />
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>

          </div>
        </div>
      </div>

      <div className={styles.coinListContainer}>
        <div className={styles.headers}>
          <span>Rank</span>
          <span>Name</span>
          <span>Price</span>
          <span>24h % </span>
          <span>Circulating Supply</span>
          <span>Market Cap</span>
          <span>Volume(24h)</span>
        </div>
        <div className={styles.coinList}>
          {
            coins.map(coin => (
                <Coin 
                key={coin.id}
                rank = {coin.rank}
                name = {`${coin.name} - ${coin.symbol}`}
                symbol = {coin.symbol}
                price = {Number(coin.priceUsd) < 0.1 ? Number(coin.priceUsd).toFixed(6) :  Number(coin.priceUsd).toFixed(2)}
                changePercent24Hr = {Number(coin.changePercent24Hr).toFixed(2)}
                supply = {Number(coin.supply).toFixed(0)}
                marketCapUsd = {Number(coin.marketCapUsd).toFixed(0)}
                volumeUsd24Hr = {Number(coin.volumeUsd24Hr).toFixed(0)}
                />
            ))
          }
        </div>
       
      </div>
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
