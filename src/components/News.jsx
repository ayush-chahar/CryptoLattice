import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('crypto');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, error, isLoading } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  // Log API responses and errors
  useEffect(() => {
    // console.log('Cryptos data:', data);
    // console.log('News data:', cryptoNews);
    // console.log(process.env.NEWS_API_KEY)
    if (error) {
      console.log('API Error:', error);
    }
  }, [data, cryptoNews, error]);

  if (isLoading) return <Loader />;

  if (!cryptoNews?.articles) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="crypto">Crypto</Option>
            {data?.data?.coins?.map((currency) => <Option key={currency.name} value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.articles.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card
            hoverable
            style={{
              height: '400px', // Adjust height as needed
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '120px', // Adjust based on image size
                }}
              >
                <img
                  src={news.urlToImage || demoImage}
                  alt="news"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div>
                <Title
                  level={4}
                  style={{
                    // margin: '10px 0',
                    // whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    width: 'auto', // Ensures the title takes up the full width of its container
                  }}
                >
                  {news.title.length > 50
                    ? `${news.title.substring(0, 50)}...`
                    : news.title}
                </Title>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto', // Pushes the provider info to the bottom
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar src={demoImage} alt="news provider" />
                  <Text
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    {news.source.name}
                  </Text>
                </div>
                <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>

        </Col>
      ))}
    </Row>
  );
};

export default News;
