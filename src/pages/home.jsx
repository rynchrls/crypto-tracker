import React from "react";
import HomeStore from "../components/homeStore";
import "../App.css";
import Header from "../components/header";
import { Link } from "react-router-dom";
import bitcoin from "../bitcoin.png";

function Home({ darkMode, handleClick }) {
  const store = HomeStore();

  React.useEffect(() => {
    if (store.trending.length === 0) store.fetchCoins();
  }, []);

  return (
    <div className="App">
      <Header handleClick={handleClick} darkMode={darkMode} />
      <div className={`home-store ${darkMode ? "home-dark" : ""}`}>
        <div className="form">
          <input
            type="text"
            placeholder="search coins..."
            value={store.query}
            onChange={store.setQuery}
          />
          <h1>{store.searched ? "Search Results" : "Trending Coins"}</h1>
          <div className="coin-container">
            {store.coins.map((data) => {
              return (
                <Link to={`/${data.id}`} className="coin" key={data.id}>
                  <div className="wrapper">
                    <img src={data.image} />
                    <h3>{data.name}</h3>
                  </div>
                  {data.priceBtc ? (
                    <div className="wrapper2">
                      <div className="icon">
                        <img src={bitcoin} />
                        <span>{data.priceBtc}</span>
                      </div>
                      <h4>
                        {data.priceUsd} {"USD"}
                      </h4>
                    </div>
                  ) : (
                    <div className="wrapper2">
                      <div className="icon">
                        <img src={bitcoin} />
                        <span>(BTC)</span>
                      </div>
                      <h4>USD</h4>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
        <footer></footer>
      </div>
      {/* {store.coins.map(e => {
        return <h1>{e.name}</h1>
      })} */}
    </div>
  );
}

export default Home;
