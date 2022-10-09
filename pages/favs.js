import Header from "../components/Header";
import Coin from "../components/Coin";
import { useCoinContext } from "../context/CoinContext";

import styles from "../styles/Favs.module.css";

export default function Favs() {
    const {favs} = useCoinContext();

    return (
        <div className={styles.container}> 
  
        <Header activePage="favs"/>

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
              (favs?.length > 0) ?
              favs.map(coin => (
                  <Coin 
                  activePage="favs"
                  key={coin.id}
                  id={coin.id}
                  rank = {coin.rank}
                  name = {`${coin.name}`}
                  symbol = {coin.symbol}
                  price = {coin.price}
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
    )
}