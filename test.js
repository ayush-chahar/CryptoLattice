const axios = require('axios');
const fs = require('fs');
const path = require('path');

// API endpoint and parameters
const apiUrl = 'https://newsapi.org/v2/everything';
const apiKey = '674525a1f2f74c86a32a18281991c21f'; // Replace with your actual API key
const newsCategory = 'cryptocurrency'; // Example category
const count = 100; // Number of articles to fetch

const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: newsCategory,
        from: getYesterdayDate(),
        sortBy: 'popularity',
        pageSize: count,
        apiKey: apiKey
      }
    });

    const data = response.data;

    // Path to the JSON file
    const filePath = path.join(__dirname, 'cryptoNewsCache.json');

    // Write data to the JSON file
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Data successfully written to', filePath);
      }
    });
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

fetchData();
