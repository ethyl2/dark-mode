import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from './Chart';
import useLocalStorage from '../hooks/useLocalStorage';

const Coins =({ strokeColor}) => {
    const [coinList, setCoinList] = useLocalStorage('coinList', []);
    const [coinChoice, setCoinChoice] = useLocalStorage('coinChoice', 'bitcoin');
    const [coinInfo, setCoinInfo] = useLocalStorage('coinInfo', {});

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/list')
            .then(response => {
                //console.log(response.data);
                setCoinList(response.data);
            })
            .catch(err => console.log(err));
    }, [coinList]);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinChoice}?localization=false&tickers=false&market_data=true&sparkline=true`)
            .then(response => {
                console.log(response.data);
                setCoinInfo(response.data);
            })
            .catch(err => console.log(err));
    }, [coinChoice]);

    const handleSubmit = e => {
        e.preventDefault();
        setCoinChoice(e.target.coinType.value);
        console.log(e.target.coinType.value);
    }

    const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
        try {
          decimalCount = Math.abs(decimalCount);
          decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      
          const negativeSign = amount < 0 ? "-" : "";
      
          let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
          let j = (i.length > 3) ? i.length % 3 : 0;
      
          return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
          console.log(e)
        }
      };

    return (
        
        <div>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor='coinType'>Choose a Coin:</label>
                <select id='coinType' name='coinType'>
                    <option value='' disabled>Cyptocurrency Choice:</option>
                {coinList.map(coin => {
                return (
                    <option key={coin.id} value={coin.id}>{coin.name}</option>
                )
            })}
                </select>
                <button type='submit'>Submit</button>
            </form>
            <div>
                <h2>About {coinInfo.name}:</h2>
                {coinInfo.image? <div className='imgContainer'><img className='coin__logo' src={coinInfo.image.large} alt='coin type' /></div> : null}
                {coinInfo.market_data? <div><h3>Today's Price: $ {coinInfo.market_data.current_price.usd} usd</h3> 
                    <p>Price Change in Last 24 Hours: $ {formatMoney(coinInfo.market_data.price_change_24h_in_currency.usd)}</p>
                    <p>24h Low/ 24h High: $ {formatMoney(coinInfo.market_data.high_24h.usd)} / $ {formatMoney(coinInfo.market_data.low_24h.usd)} usd</p>
                    <h3>Market Cap: $ {formatMoney(coinInfo.market_data.market_cap.usd)} usd</h3>
                    
                    </div>
                    : null}
                {coinInfo.links? <a href={coinInfo.links.homepage[0]}>{coinInfo.links.homepage[0]}</a> : null}
                {coinInfo.description? <div><p>{coinInfo.description.en}</p></div> : null }
            </div>
            {coinInfo.market_data? <Chart sparklineData={coinInfo.market_data.sparkline_7d.price} strokeColor={strokeColor} /> : null }
            
        </div>
    )
};

export default Coins;