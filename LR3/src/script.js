// Объект с параметрами вкладов для разных видов
const terms = {
    "Пополняемый": {
        "6 месяцев": 20,
        "1 год": 22,
        "1,5 года": 15,
        "2 года": 10,
    },
    "Срочный": {
        "3 месяца": 20,
        "6 месяцев": 22,
        "9 месяцев": 23,
        "1 год": 24,
        "1,5 года": 18,
        "2 года": 15,
    }
};

// Получаем элементы формы
const depositType = document.getElementById("depositType"); // Вид вклада
const depositTerm = document.getElementById("depositTerm"); // Срок вклада
const result = document.getElementById("result"); // Блок для вывода результата

// Событие: обновление списка сроков вклада при выборе типа
depositType.addEventListener("change", () => {
    const selectedType = depositType.value; // Выбранный вид вклада
    depositTerm.innerHTML = "<option value=''>Выберите срок вклада</option>"; // Очистка списка сроков

    // Если выбран валидный вид вклада
    if (selectedType && terms[selectedType]) {
        // Заполняем сроки и проценты
        for (const [term, rate] of Object.entries(terms[selectedType])) {
            const option = document.createElement("option");
            option.value = term; // Значение срока
            option.textContent = `${term} - ${rate}%`; // Отображаемый текст
            depositTerm.appendChild(option);
        }
    }
});

// Функция для получения срока в годах
function parseTermToYears(term) {
    if (term.includes("месяц")) {
        // Преобразуем месяцы в годы
        const months = parseFloat(term.split(" ")[0]);
        return months / 12;
    } else if (term.includes("год")) {
        // Преобразуем года в числовое значение
        return parseFloat(term.split(" ")[0].replace(",", "."));
    }
    return 0; // На случай некорректных данных
}

// Функция для расчёта итоговой суммы
function calculate() {
    const type = depositType.value; // Вид вклада
    const term = depositTerm.value; // Срок вклада
    const amount = parseFloat(document.getElementById("amount").value); // Сумма вклада

    // Проверка на заполнение всех полей
    if (!type || !term || isNaN(amount) || amount <= 0) {
        result.textContent = "Пожалуйста, заполните все поля корректно."; // Сообщение об ошибке
        return;
    }

    // Получаем процентную ставку и срок
    const rate = terms[type][term]; // Процентная ставка
    const years = parseTermToYears(term); // Срок вклада в годах

    // Расчёт итоговой суммы: сумма вклада + проценты
    const finalAmount = amount * (1 + rate / 100 * years);

    // Формируем сообщение с результатом
    result.textContent = `Вы выбрали вклад "${type}" на срок "${term}" с суммой ${amount.toFixed(2)} ₽. Итоговая сумма: ${finalAmount.toFixed(2)} ₽.`;
}

