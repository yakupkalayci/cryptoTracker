import axios from "axios";
import Header from "../components/Header";
import Coin from "../components/Coin";
import { useCoinContext } from "../context/CoinContext";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({coins}) {
  const {filterCoinList} = useCoinContext();

  const data = filterCoinList(coins);

  return (
    <div className={styles.container}>
      
      <Header />

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
            data.map(coin => (
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
