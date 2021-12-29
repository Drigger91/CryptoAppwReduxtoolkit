import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useState, useEffect } from "react";
import { useGetCryptosQuery } from "../services/CryptoApi";
import Loader from "./Loader";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [coins, setcoins] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(SearchTerm.toLowerCase())
    );
    setcoins(filteredData);
  }, [cryptoList, SearchTerm]);
  if (isFetching) {
    return <Loader/>;
  }
  return (
    <>
      <div className={simplified?'d-none':'search-crypto'}>
        <Input
          placeholder="Search Coins here."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {coins?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Current Price : {millify(currency.price)} USD</p>
                <p>Market Cap : {millify(currency.marketCap)} USD</p>
                <p>Daily Change : {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
