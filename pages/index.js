import axios from "axios";
import {useCoinContext} from "../context/CoinContext";
import useCoin from "../hooks/useCoin";
import Header from "../components/Header";
import Coin from "../components/Coin";
import styles from "../styles/Home.module.css";


export default function Home({coinList}) {
  const {coin, isLoading, isError} = useCoin("bitcoin");

  const {filterCoinList} = useCoinContext();
  const result = filterCoinList(coinList);

  if(isError) return <div className={styles.container}><div className={styles.message}>Failed to load</div></div>
  if(isLoading) return <div className={styles.container}><div className={styles.message}>Loading..</div></div>

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
                  key={coin.id}
                  id={coin.id}
                  activePage="home" 
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

export async function getStaticProps() {
  const {data} = await axios.get("https://api.coincap.io/v2/assets");

  return {
    props: {
      coinList: data.data
    }
  }

}