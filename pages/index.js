import axios from "axios";
import useSwr from "swr";

import Header from "../components/Header";
import Coin from "../components/Coin";
import { useCoinContext } from "../context/CoinContext";
import styles from "../styles/Home.module.css";

const fetcher = url => axios.get(url).then(res => res.data.data);

export default function Home() {
  const {data, error} = useSwr("https://api.coincap.io/v2/assets", fetcher);

  const {filterCoinList} = useCoinContext();
  const result = filterCoinList(data);

  if(error) return <div className={styles.container}><div className={styles.message}>Failed to load</div></div>
  if(!data) return <div className={styles.container}><div className={styles.message}>Loading..</div></div>

  return (
    <div className={styles.container}> 
  
        <Header activePage="home"/>

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
              (result.length > 0) ?
              result.map(coin => (
                  <Coin
                  activePage="home" 
                  key={coin.id}
                  id={coin.id}
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
              :
              <div className={styles.infoText}>Nothing found!</div>
            }
          </div>
         
        </div>
      
    </div>
  );
}

