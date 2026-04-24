const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => res.send('Прокси-сервер активен!'));

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await fetch(`https://www.comics.org/api/series/?name=${encodeURIComponent(query)}`, { headers: HEADERS });
        const data = await response.json();
        res.jsonp(data); // ДОБАВИЛИ БУКВУ p ЗДЕСЬ
    } catch (error) {
        res.status(500).jsonp({ error: error.message });
    }
});

app.get('/issue', async (req, res) => {
    try {
        const seriesId = req.query.series;
        const response = await fetch(`https://www.comics.org/api/issue/?series=${seriesId}&limit=1`, { headers: HEADERS });
        const data = await response.json();
        res.jsonp(data); // И ДОБАВИЛИ БУКВУ p ЗДЕСЬ
    } catch (error) {
        res.status(500).jsonp({ error: error.message });
    }
});

app.listen(process.env.PORT || 3000, () => console.log(`Proxy running`));
