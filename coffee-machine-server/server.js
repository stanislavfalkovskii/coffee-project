const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());

const configurations = [  
    { id: 4, size: 'large', sizeLabel: 'Увеличеный', drinks: '6' },
    { id: 5, size: 'large', sizeLabel: 'Увеличеный', drinks: '8' },
    { id: 6, size: 'large', sizeLabel: 'Увеличеный', drinks: '12' }, 
    { id: 4, size: 'standard', sizeLabel: 'Стандартный', drinks: '6' },
    { id: 5, size: 'standard', sizeLabel: 'Стандартный', drinks: '8' },
    { id: 6, size: 'standard', sizeLabel: 'Стандартный', drinks: '12' }
];

app.get('/api/configurations', (req, res) => {
  res.json(configurations);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});