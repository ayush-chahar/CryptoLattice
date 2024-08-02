import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  coinHistory?.data?.history?.forEach((entry) => {
    coinPrice.push(parseFloat(entry.price)); // Convert price to float
    coinTimestamp.push(new Date(entry.timestamp * 1000).toLocaleDateString()); // Convert timestamp to milliseconds
  });

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false, // Price data likely won't start at zero
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;