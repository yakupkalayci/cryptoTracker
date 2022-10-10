import Header from "../components/Header";
import Coin from "../components/Coin";
import { useCoinContext } from "../context/CoinContext";

import styles from "../styles/Favs.module.css";

export default function Favs() {
    const {favs, filterCoinList} = useCoinContext();

    const results = filterCoinList(favs);

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
              (results.length > 0) ?
              results.map(coin => (
                  <Coin 
                  activePage="favs"
                  key={coin.id}
                  id={coin.id}
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