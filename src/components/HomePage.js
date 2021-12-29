import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/CryptoApi";
import CryptoCurrencies from "./CryptoCurrencies"
import News from './News'
import Loader from "./Loader";

const { Title } = Typography;
const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) {
    return <Loader/>;
  }
  return (
    <>
    <div className="Stats-home">
    <div className="Stats-home-2">
      <Title  className="heading" id="Stats-home heading">
        <h1>Global Crypto Statistics by <b className="LOGO">CryptoApp</b></h1>
        <p id="small">The perfect platform for your crypto-analysis.</p>
      </Title>
      <Row className="Stats-home-stats">
        <Col span={12}>
          <Statistic title="Total Crypto Currencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market change" value={millify(globalStats.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total daily volume" value={millify(globalStats.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
        </Col>{" "}
      </Row>
      </div>
      <div className="animation">
      <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_qsoc3fru.json"  background="transparent"  speed="1"   loop autoplay></lottie-player>
      </div>
      </div>
      <div className="home-heading-container">
          <Title level={2} className="home-title">Top Coins for new investors</Title>
          <Title level={3} className="show-more"><Link to='/cryptocoins'>Load More</Link></Title>
      </div>
      <CryptoCurrencies simplified = {true}/>
      <div className="home-heading-container">
          <Title level={2} className="home-title">Daily Crypto News</Title>
          <Title level={3} className="show-more"><Link to='/news'>Load More</Link></Title>
      </div>
      <News simplified = {true}/>
    </>
  );
};

export default HomePage;
