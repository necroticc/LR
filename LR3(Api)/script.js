const axios = require('axios');

// Функция для получения вакансий с hh.ru
async function getVacancies(query, page = 0) {
    try {
        const response = await axios.get('https://api.hh.ru/vacancies', {
            params: {
                text: query,
                page: page, // Номер страницы результатов (по умолчанию 0)
                per_page: 10 // Количество вакансий на странице
            }
        });

        const vacancies = response.data.items;
        if (vacancies.length === 0) {
            console.log('Вакансии не найдены.');
        } else {
            console.log(`Найдено ${response.data.found} вакансий:`);
            vacancies.forEach((vacancy, index) => {
                console.log(`${index + 1}. ${vacancy.name}`);
                console.log(`Компания: ${vacancy.employer.name}`);
                console.log(`Город: ${vacancy.area.name}`);
                console.log(`Зарплата: ${vacancy.salary ? `${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}` : 'Не указана'}`);
                console.log(`Ссылка: ${vacancy.alternate_url}\n`);
            });
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}
