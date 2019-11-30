import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import Coins from './components/Coins';
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
      <Route exact path='/' render={props => {
        return <Charts {...props} coinData={coinData} strokeColor={strokeColor} />
      }} />
      <Route path='/coins' component={Coins} />
      
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Router><App /></Router>, rootElement);
