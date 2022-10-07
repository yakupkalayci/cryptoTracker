import { MdFavoriteBorder, MdArrowDropUp, MdArrowDropDown} from "react-icons/md";
import { findDigit } from "../utils/findDigit";

import styles from "../styles/Coin.module.css";

export default function Coin(props) {

  return (
    <div className={styles.coin}>
      <span className={styles.icon}>
        <MdFavoriteBorder />
      </span>

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
