import { MdFavoriteBorder, MdArrowDropUp, MdArrowDropDown, MdOutlineRemoveCircleOutline} from "react-icons/md";
import { useToast } from '@chakra-ui/react'

import { useCoinContext } from "../context/CoinContext";
import useCoin from "../hooks/useCoin";
import { findDigit } from "../utils/findDigit";

import styles from "../styles/Coin.module.css";

export default function Coin(props) {
  const {coin, isLoading, isError} = useCoin(props.id);

  const {addToFavs, removeFromFavs} = useCoinContext();
  const toast = useToast();

  if(isLoading) {
    return (
      <div className={styles.coin}>
        {
          props.activePage === "home" ?
          <span className={styles.icon}>
            <MdFavoriteBorder />
          </span>
          :
          <span 
            className={styles.icon} >
            <MdOutlineRemoveCircleOutline/>
          </span>
        }
  
        <span className={styles.rank}> ...</span>
        <span className={styles.name}> ...</span>
        <span className={styles.price}>...</span>
        <span className={styles.changePercent24Hr}>...</span>
        <span> ..</span>
        <span> ...</span>
        <span> ...</span>
      </div>   
    ) 
  }

  if(isError) {
    toast({
      title: "Error",
      description: "Failed to load",
      status: "error",
      isClosable: true,
    })
  }

  return (
    <div className={styles.coin}>
      {
        props.activePage === "home" ?
        <span className={styles.icon} 
        onClick={() => toast(addToFavs(coin))}>
          <MdFavoriteBorder />
        </span>
        :
        <span 
          className={styles.icon} 
          onClick={() => toast(removeFromFavs(coin.id))}>
          <MdOutlineRemoveCircleOutline/>
        </span>
      }

      <span className={styles.rank}> {coin?.rank}</span>
      <span className={styles.name}> 
        <img src={`../public/assets/32/icon/${coin?.symbol}.png`} /> {`${coin?.name} - ${coin?.symbol}`}
      </span>
      <span className={styles.price}> ${findDigit(Number(coin?.priceUsd) < 0.1 ? Number(coin?.priceUsd).toFixed(6) :  Number(coin?.priceUsd).toFixed(2))}</span>
      <span className={styles.changePercent24Hr}> 
        {
            Number(coin?.changePercent24Hr) > 0 ?
            <MdArrowDropUp size="40px" color="lightGreen"/>
            :
            <MdArrowDropDown size="40px" color="darkRed" />
        }
        {Number(coin?.changePercent24Hr).toFixed(2)}
      </span>
      <span> {findDigit(Number(coin?.supply).toFixed(0))} {coin?.symbol}</span>
      <span> ${findDigit(Number(coin?.marketCapUsd).toFixed(0))}</span>
      <span> ${findDigit(Number(coin?.volumeUsd24Hr).toFixed(0))}</span>
    </div>
  );
}
