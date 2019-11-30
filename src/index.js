import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import useLocalStorage from './hooks/useLocalStorage';

import "./styles.scss";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [strokeColor, setStrokeColor] =useLocalStorage('strokeColor', '#8884d8');

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="App">
      <Navbar strokeColor={strokeColor} setStrokeColor={setStrokeColor}/>
      <Charts coinData={coinData} strokeColor={strokeColor}/>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
