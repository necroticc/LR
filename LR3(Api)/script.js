async function searchVacancies() {
    const query = document.getElementById('searchQuery').value.trim();
    const resultsContainer = document.getElementById('vacancyResults');
    resultsContainer.innerHTML = 'Загружаем вакансии...';

    if (!query) {
        resultsContainer.innerHTML = 'Введите запрос для поиска.';
        return;
    }

    try {
        const response = await axios.get('https://api.hh.ru/vacancies', {
            params: {
                text: query,
                per_page: 5,
                page: 0
            }
        });

        const vacancies = response.data.items;
        if (vacancies.length === 0) {
            resultsContainer.innerHTML = 'Вакансии не найдены.';
        } else {
            resultsContainer.innerHTML = '';
            vacancies.forEach(vacancy => {
                const vacancyElement = document.createElement('div');
                vacancyElement.classList.add('vacancy');
                vacancyElement.innerHTML = `
                    <h3>${vacancy.name}</h3>
                    <p><strong>Компания:</strong> ${vacancy.employer.name}</p>
                    <p><strong>Город:</strong> ${vacancy.area.name}</p>
                    <p><strong>Зарплата:</strong> ${vacancy.salary ? `${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}` : 'Не указана'}</p>
                    <a href="${vacancy.alternate_url}" target="_blank">Подробнее</a>
                `;
                resultsContainer.appendChild(vacancyElement);
            });
        }
    } catch (error) {
        resultsContainer.innerHTML = 'Ошибка при загрузке данных. Попробуйте позже.';
        console.error('Ошибка:', error);
    }
}
