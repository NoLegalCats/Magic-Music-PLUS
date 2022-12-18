require('dotenv').config()
const express  = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload');

const hostname = process.env.hostname || '127.0.0.1';
const port = process.env.port || 3000;

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

//   Обработка ошибок
app.use(errorHandler)

// Основной роут
app.get('/', (req, res) => {
    res.status(200). json({message: 'Working!'})
})

//Запуск Сервера
const start = async() => {
    try{
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
    catch(e){
        console.log(e)
    }
}

start() // Для запуска к терминал отправить комнду:   npm run dev