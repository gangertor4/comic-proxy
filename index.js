const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// 1. Стартовая страница (чтобы легко будить сервер)
app.get('/', (req, res) => {
    res.send('Прокси-сервер активен и готов к работе!');
});

// Маскируемся под обычный браузер, чтобы GCD нас не блокировал
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json'
};

// 2. Поиск
app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await fetch(`https://www.comics.org/api/series/?name=${encodeURIComponent(query)}`, { headers: HEADERS });
        
        if (!response.ok) throw new Error(`Ошибка от GCD: ${response.status}`);
        
        const data = await response.json();
        res.json(data); 
    } catch (error) {
        console.error('Ошибка поиска:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 3. Авторы
app.get('/issue', async (req, res) => {
    try {
        const seriesId = req.query.series;
        const response = await fetch(`https://www.comics.org/api/issue/?series=${seriesId}&limit=1`, { headers: HEADERS });
        
        if (!response.ok) throw new Error(`Ошибка от GCD: ${response.status}`);
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Ошибка авторов:', error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
