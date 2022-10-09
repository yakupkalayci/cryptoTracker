import { useContext, createContext, useState, useEffect } from "react";

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [searchVal, setSearchVal] = useState("");
  const initialFavs = [];
  const [favs, setFavs] = useState(initialFavs);

  useEffect(() => {
    if(localStorage.getItem("favs")) {
      setFavs(JSON.parse(localStorage.getItem("favs")));
    } else {
      localStorage.setItem("favs", []);
    }
  }, []);
  

  useEffect(() => {
    if(initialFavs !== favs) {
      localStorage.setItem("favs", JSON.stringify(favs));
    }
  }, [favs])

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

  const addToFavs = (coin) => {
    if(favs.length > 0) {
      let result = favs.find(item => item.id === coin.id);
      if(!result) setFavs([...favs, coin]); 
    } else {
      setFavs([...favs, coin]);
    }
  }

  const removeFromFavs = (id) => {
    setFavs(
      favs.filter(item => item.id !== id)
    );
  }

  return (
    <CoinContext.Provider
      value={{
        searchVal,
        handleInput,
        filterCoinList,
        favs,
        addToFavs,
        removeFromFavs
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export const useCoinContext = () => useContext(CoinContext);
