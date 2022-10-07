import { useContext, createContext, useState } from "react";

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [searchVal, setSearchVal] = useState("");

  const handleInput = (e) => {
    setSearchVal(e.target.value);
  };

  const filterCoinList = (coinList) => {
    if (searchVal) {
      const result = coinList.filter((coin) => {
        const name = coin.name.toLowerCase();
        const symbol = coin.symbol.toLowerCase();

        return name.indexOf(searchVal.toLowerCase()) > -1 || symbol.indexOf(searchVal.toLowerCase()) > -1;
      });
      return result;
    } else {
        return coinList;
    }
  };

  return (
    <CoinContext.Provider
      value={{
        searchVal,
        handleInput,
        filterCoinList
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export const useCoinContext = () => useContext(CoinContext);
