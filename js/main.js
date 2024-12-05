document.getElementById('data_form').addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем стандартную отправку формы

    // Сначала очищаем старые ошибки
    clearErrors();

    // Получаем значения из полей
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // Флаги ошибок
    let hasError = false;

    // Проверка дня
    if (!isValidDay(day)) {
        showError('day', 'Must be a valid day (1-31)');
        hasError = true;
    }

    // Проверка месяца
    if (!isValidMonth(month)) {
        showError('month', 'Must be a valid month (1-12)');
        hasError = true;
    }

    // Проверка года
    if (!isValidYear(year)) {
        showError('year', 'Must be in the past');
        hasError = true;
    }

    // Если есть ошибки - выходим
    if (hasError) return;

    // Если ошибок нет - вычисляем возраст
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // Месяцы в JavaScript начинаются с 0
    const age = calculateAge(today, birthDate);

    // Отображаем результаты
    displayResults(age);
});

// Функции для валидации
function isValidDay(day) {
    const dayNum = parseInt(day);
    return !isNaN(dayNum) && dayNum >= 1 && dayNum <= 31;
}

function isValidMonth(month) {
    const monthNum = parseInt(month);
    return !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12;
}

function isValidYear(year) {
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    return !isNaN(yearNum) && yearNum <= currentYear;
}

// Функция для отображения ошибок
function showError(field, message) {
    document.getElementById(`${field}-error`).textContent = message;
    document.getElementById(field).classList.add('error');
}

// Функция для очистки ошибок
function clearErrors() {
    const fields = ['day', 'month', 'year'];
    fields.forEach(field => {
        document.getElementById(`${field}-error`).textContent = '';
        document.getElementById(field).classList.remove('error');
    });
}

// Функция для вычисления возраста
function calculateAge(today, birthDate) {
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }
    if (days < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        days += lastMonth.getDate();
    }

    return { years, months, days };
}

// Функция для отображения результата
function displayResults(age) {
    document.querySelector('.results_years .result_data').textContent = age.years;
    document.querySelector('.results_months .result_data').textContent = age.months;
    document.querySelector('.results_days .result_data').textContent = age.days;
}
