const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const apiKey = process.env.API_KEY;
const regions = 'eu';
const markets = 'h2h';
const oddsFormat = 'decimal';
const dateFormat = 'iso';

const sportKeys = [
  'soccer_epl',
  'soccer_uefa_champs_league',
  'soccer_spain_la_liga',
  'soccer_germany_bundesliga',
  'soccer_italy_serie_a',
  'soccer_france_ligue_one',
  'soccer_brazil_campeonato'
];

app.get('/odds', async (req, res) => {
  try {
    const allOdds = [];

    for (const sportKey of sportKeys) {
      const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
        params: {
          apiKey,
          //regions,
          bookmakers: 'marathonbet',  // <-- use this
          markets,
          oddsFormat,
          dateFormat,
        }
      });

      allOdds.push(...response.data); // merge the arrays
    }

    res.json(allOdds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Odds microservice running on http://localhost:${PORT}`);
});