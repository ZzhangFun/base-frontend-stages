require('dotenv').config()
const PORT = process.env.PORT || 8080;
const path = require('path');
const express = require('express');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, '../client')));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.listen(PORT, () => console.log(`Server started with ${PORT} port`));