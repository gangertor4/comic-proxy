const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await fetch(`https://www.comics.org/api/series/?name=${encodeURIComponent(query)}`);
        const data = await response.json();
        res.json(data); 
    } catch (error) {
        res.status(500).json({ error: 'Ошибка GCD' });
    }
});

app.get('/issue', async (req, res) => {
    try {
        const seriesId = req.query.series;
        const response = await fetch(`https://www.comics.org/api/issue/?series=${seriesId}&limit=1`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка GCD' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
