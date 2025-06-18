CREATE TABLE employee_responses (
    id SERIAL PRIMARY KEY,
    request TEXT, -- текст просьбы
    salary_rating VARCHAR(50), -- оценка зарплаты
    working_conditions VARCHAR(50), -- условия труда
    career_growth BOOLEAN, -- есть ли карьерный рост
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);