import React, { useState } from "react";
import { Card, Avatar, Typography, Row, Col, Select } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/CryptoNews";
import { useGetCryptosQuery } from "../services/CryptoApi";
import Loader from "./Loader";
const { Text, Title } = Typography;
const { Option } = Select;
const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState("Cryptocurrency");
  const {data} = useGetCryptosQuery(100);
  const count = simplified ? 4 : 25;
  const { data: cryptoNews } = useGetNewsQuery({
    newsCategory,
    count,
  });
  console.log(cryptoNews);
  if (!cryptoNews?.value) {
    return <Loader></Loader>;
  }

  return (
    <div className="news-container">
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a coin"
            optionFilterProp="children"
            onChange={(value)=>setnewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="cryptocurrency">All Coins</Option>
            {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, index) => {
        return (
          <Col xs={24} sm={12} md={10} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank">
                <div className="news-image-container">
                  <Title level={5} className="news-title">
                    {news.name}
                  </Title>
                  <img src={news?.image?.thumbnail?.contentUrl} alt="news" />
                </div>
                <p>
                  {news.description > 50
                    ? `${news.description.substring(0, 50)}....`
                    : news.description}
                </p>
                <div className="provider-container">
                  <Text>
                    {" "}
                    Published{" "}
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
    </div>
  );
};

export default News;
