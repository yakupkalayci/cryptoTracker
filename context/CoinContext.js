import { useContext, createContext, useState } from "react";

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [searchVal, setSearchVal] = useState("");

  const handleInput = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <CoinContext.Provider
      value={{
        searchVal,
        handleInput,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export const useCoinContext = () => useContext(CoinContext);
