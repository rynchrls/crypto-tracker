import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../App.css";
import ShowStore from "../components/showStore";
import { Link, useParams } from "react-router-dom";
import Header from "../components/header";

function Show({ darkMode, handleClick }) {
  const store = ShowStore();
  const params = useParams();
  React.useEffect(() => {
    store.fetchData(params.id);

    return () => {
      store.reset();
    };
  }, []);

  if (!store.storey) return <></>;

  return (
    <div>
      <Header darkMode={darkMode} handleClick={handleClick} />
      <div className={`crypto ${darkMode ? "crypto-dark" : ""}`}>
        <div className="header">
          <img src={store.storey.image.large} />
          <h2>
            {store.storey.name} ({store.storey.symbol})
          </h2>
        </div>
        <div className="chart">
        <ResponsiveContainer width={750} height={350} minWidth={300} minHeight={200}>
        <AreaChart
          // width={500}
          // height={400}
          data={store.graphData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
        </div>
        <h3>Details</h3>
        <div className="details">
          <div className="detail">
            <h4>Market cap rank</h4>
            <span>{store.storey.market_cap_rank}</span>
          </div>
          <div className="detail">
            <h4>24h high</h4>
            <span>
              $ <span>{store.storey.market_data.high_24h.usd}</span>
            </span>
          </div>
          <div className="detail">
            <h4>24h low</h4>
            <span>
              $ <span>{store.storey.market_data.low_24h.usd}</span>
            </span>
          </div>
          <div className="detail">
            <h4>Circulating supply</h4>
            <span>
              $ <span>{store.storey.market_data.circulating_supply}</span>
            </span>
          </div>
          <div className="detail">
            <h4>Current price</h4>
            <span>
              $ <span>{store.storey.market_data.current_price.usd}</span>
            </span>
          </div>
          <div className="detail">
            <h4>1y change</h4>
            <span>
              {store.storey.market_data.price_change_percentage_1y.toFixed(2)}%
            </span>
          </div>
        </div>
        <h5 className="back">
          <Link to="/">Back</Link>
        </h5>
      </div>
    </div>
  );
}

export default Show;
