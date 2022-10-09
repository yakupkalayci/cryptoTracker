import { MdFavoriteBorder, MdArrowDropUp, MdArrowDropDown, MdOutlineRemoveCircleOutline} from "react-icons/md";
import { useToast } from '@chakra-ui/react'
import { useCoinContext } from "../context/CoinContext";
import { findDigit } from "../utils/findDigit";

import styles from "../styles/Coin.module.css";

export default function Coin(props) {
  const {addToFavs, removeFromFavs} = useCoinContext();
  const toast = useToast();

  return (
    <div className={styles.coin}>
      {
        props.activePage === "home" ?
        <span className={styles.icon} 
        onClick={() => {
          addToFavs(props);
          toast({
            title:"Success",
            description: "Coin is added to your list.",
            status:"success",
            position:"bottom-left",
            duration:3000
          });
        }}>
          <MdFavoriteBorder />
        </span>
        :
        <span 
          className={styles.icon} 
          onClick={
            () => {
              removeFromFavs(props.id);
              toast({
                title:"Success",
                description: "Coin is removed from your list.",
                status:"success",
                position:"bottom-left",
                duration:3000
              })
            }
          }>
          <MdOutlineRemoveCircleOutline/>
        </span>
      }

      <span className={styles.rank}> {props.rank}</span>
      <span className={styles.name}> 
        <img src={`./assets/32/icon/${props.symbol}.png`} /> {props.name}
      </span>
      <span className={styles.price}> ${findDigit(props.price)}</span>
      <span className={styles.changePercent24Hr}> 
        {
            Number(props.changePercent24Hr) > 0 ?
            <MdArrowDropUp size="40px" color="lightGreen"/>
            :
            <MdArrowDropDown size="40px" color="darkRed" />
        }
        {props.changePercent24Hr}
      </span>
      <span> {findDigit(props.supply)} {props.symbol}</span>
      <span> ${findDigit(props.marketCapUsd)}</span>
      <span> ${findDigit(props.volumeUsd24Hr)}</span>
    </div>
  );
}
