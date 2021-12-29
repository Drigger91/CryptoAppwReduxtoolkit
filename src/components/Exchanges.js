import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Card } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/CryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <div className='exchange-container'>
        {exchangesList.map((exchange) => (
          <Card>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id} className='exchange-card'>
                    <Col span={6} id='Columns'>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col> <br></br>
                    <Col span={24} id='Columns'><b>Exchange Volume</b> - ${millify(exchange.volume)}</Col>
                    <Col span={24}  id='Columns'> <b>Number of markets </b> - {millify(exchange.numberOfMarkets)}</Col>
                    <Col span={24} id='Columns'><b>Market share </b> - {millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Exchanges;
