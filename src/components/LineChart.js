import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale)

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const TimeStamps = [];
    for(let i = 0;i <coinHistory?.data?.history?.length ;i++){
            coinPrice.push(coinHistory?.data?.history[i].price)
            TimeStamps.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString())
    }
    const data = {
        labels : TimeStamps,
        datasets :[{
            label : "Price in USD",
            data : coinPrice,
            fill : false,
            backgroundColor : '#0071bd',
            borderColor : '#0071bd'
        }]
    }
    const options = {
        scales : {
            yAxes:[
                {
                    ticks:{
                      beginAtZero :true
                    }
                }
            ]
        }
    }
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} price chart
        </Title>
        <Col className="price-container">
          <Title className="price-change" level={5}>
            {coinHistory?.data?.change}%
          </Title>
          <Title className="current-price" level={5}>
            Current Price : {currentPrice} USD
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options}></Line>
    </>
  );
};

export default LineChart;
