const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // ✅ Добавлено

dotenv.config();

const app = express();
const pool = new Pool({
    user: process.env.DB_USER || 'admin',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'employee_db',
    password: process.env.DB_PASSWORD || 'secret',
    port: process.env.DB_PORT || 5432,
});

app.use(cors());
app.use(express.json());
// Раздача статики
app.use(express.static(path.join(__dirname, 'public')));
//  Все не-API маршруты
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Анонимная просьба
app.post('/submit-request', async (req, res) => {
    try {
        const { request } = req.body;

        if (!request) {
            return res.status(400).send('Поле "request" не может быть пустым');
        }

        await pool.query(
            'INSERT INTO anonymous_requests (request) VALUES ($1)',
            [request]
        );
        res.sendStatus(200);
    } catch (err) {
        console.error('Ошибка при сохранении просьбы:', err.message);
        res.status(500).send('Ошибка сохранения просьбы');
    }
});
app.post('/submit-test', async (req, res) => {
    console.log('Received request body:', req.body); // Логируем входящие данные

    try {
        const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15 } = req.body;

        // Проверка обязательных полей
        if (!q1 || !q2 || !q3 || !q4 || !q5 || !q7 || !q8 || !q9 || !q10 || !q14 || !q15) {
            return res.status(400).send({
                error: 'Не все обязательные поля заполнены',
                requiredFields: ['q1', 'q2', 'q3', 'q4', 'q5', 'q7', 'q8', 'q9', 'q10', 'q14', 'q15']
            });
        }

        // Проверка формата q12 и q13
        if (!Array.isArray(q12)) {
            return res.status(400).send({ error: 'Поле q12 должно быть массивом' });
        }
        if (!Array.isArray(q13)) {
            return res.status(400).send({ error: 'Поле q13 должно быть массивом' });
        }

        // Преобразование массивов в JSONB (если необходимо)
        const q12Json = JSON.stringify(q12);
        const q13Json = JSON.stringify(q13);

        await pool.query(
            `INSERT INTO employee_responses 
            (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
            [
                q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11,
                q12Json, q13Json, q14, q15
            ]
        );

        res.sendStatus(200);
    } catch (err) {
        console.error('Ошибка при сохранении теста:', err.message);
        if (err.code === '22P02') { // Ошибка типа данных в PostgreSQL
            return res.status(400).send({
                error: 'Неверный формат данных',
                details: err.message
            });
        }
        res.status(500).send('Ошибка сохранения теста');
    }
});


// Получение всех ответов (в HTML-таблице)
app.get('/get-requests', async (req, res) => {
    const key = req.query.key;
    if (key !== process.env.SECRET_KEY) return res.status(403).send('Нет доступа');

    try {
        const results = await pool.query('SELECT id, request, created_at FROM anonymous_requests ORDER BY created_at DESC');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка загрузки просьб');
    }
});
// Получение всех ответов в формате JSON
app.get('/get-test-results', async (req, res) => {
    const key = req.query.key;
    if (key !== process.env.SECRET_KEY) return res.status(403).send('Нет доступа');

    try {
        const results = await pool.query('SELECT * FROM employee_responses ORDER BY created_at DESC');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка загрузки результатов теста');
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});