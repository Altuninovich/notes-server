const express = require('express');
const config = require('config');
const path = require('path')
const mongoose = require('mongoose');


const app = express();

app.use(express.json({ extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/note', require('./routes/note.routes'));
app.use('/t', require('./routes/redirect.routes'));
/*
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }
*/
const PORT = process.env.PORT || config.get('port');

async function start() {
    try {
        
        //сперва идет подключение к базе данных
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
        })
    
       //если база данных подключена то запускаем сервер
        app.listen(PORT, () => console.log(`woooyyyyy ${PORT} `));
    } catch (e) {
        console.log('Server error СБОЙ', e.message);
        process.exit(1);
    }
}

start();

