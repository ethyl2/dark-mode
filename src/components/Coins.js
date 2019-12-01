import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Coins =() => {
    const [coinList, setCoinList] = useState([]);
    const [coinChoice, setCoinChoice] = useState('01coin');
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
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinChoice}?localization=false&tickers=false&market_data=false&sparkline=true`)
            .then(response => {
                console.log(response);
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
                <h2>All About {coinInfo.name}:</h2>
                {coinInfo.description? <div><p>{coinInfo.description.en}</p></div> : null }
            </div>
            
        </div>
    )
};

export default Coins;