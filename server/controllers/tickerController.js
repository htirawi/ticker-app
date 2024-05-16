const axios = require('axios');

const getTicker = async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://api.bitfinex.com/v1/pubticker/${symbol}`
    );
    const results = response.data;
    return res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Bitfinex API');
  }
};

module.exports = getTicker;
