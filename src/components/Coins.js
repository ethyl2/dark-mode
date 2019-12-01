import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './Chart';

const Coins =({ strokeColor}) => {
    const [coinList, setCoinList] = useState([]);
    const [coinChoice, setCoinChoice] = useState('bitcoin');
    const [coinInfo, setCoinInfo] = useState({});

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/list')
            .then(response => {
                //console.log(response.data);
                setCoinList(response.data);
            })
            .catch(err => console.log(err));
    }, []);

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
                {coinInfo.links? <a href={coinInfo.links.homepage[0]}>{coinInfo.links.homepage[0]}</a> : null}
                {coinInfo.description? <div><p>{coinInfo.description.en}</p></div> : null }
            </div>
            {coinInfo.market_data? <Chart sparklineData={coinInfo.market_data.sparkline_7d.price} strokeColor={strokeColor} /> : null }
            
        </div>
    )
};

export default Coins;