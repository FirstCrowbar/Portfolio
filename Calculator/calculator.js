const form = document.querySelectorAll('.form_money');
let input = document.querySelectorAll('.input_money');
const summaContainer = document.querySelector('#summa');
let summaLocal = document.querySelectorAll('.summaLocal');
let cashDb = {
    summa: 0,
    categories: [0, 0, 0, 0, 0, 0, 0]
};

//_______________________________________________________________
//ТРИГГЕРЫ
//Триггер нажатия на "+"
form.forEach( (form, i) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (isNaN(+input[i].value)) {
            alert('Введите число!');
            input[i].value = "";
        } else {
            adding(+input[i].value, i);
        }

    });
});


//______________________________________________________________
//ФУНКЦИЯ СУММИРОВАНИЯ ЧИСЕЛ
function adding(pay, i) {
    //Расчёт общей суммы
    cashDb.summa = cashDb.summa + pay;
    summaContainer.textContent = "";
    summaContainer.textContent = `Общая сумма: ${cashDb.summa} р.`;

    //Формирование массива затрат по категориям
    let num = +input[i].value + cashDb.categories[i];
    input[i].value = "";
    cashDb.categories.splice(i, 1, num);
    summaLocal[i].textContent = "";
    summaLocal[i].textContent = `${cashDb.categories[i]} р.`;
    google.charts.setOnLoadCallback(drawChart);
}

//______________________________________________________________
//ПЕРЕМЕЩЕНИЕ СТРЕЛКАМИ
input.forEach((input, i) => {
   input.addEventListener('keydown', (event) => {
        if (event.code === "ArrowDown") {
            this[i + 1].focus();
        } else if (event.code === "ArrowUp") {
            this[i - 1].focus();
        }
   });
});

//______________________________________________________________
//ПОСТРОЕНИЕ ДИАГРАММЫ
function drawChart() {
    // Define the chart to be drawn.
    let data = new google.visualization.DataTable();

    data.addColumn('string', 'Browser');
    data.addColumn('number', 'Percentage');
    data.addRows([
        ['Продукты', cashDb.categories[0]],
        ['Хоз. товары', cashDb.categories[1]],
        ['Развлечения', cashDb.categories[2]],
        ['Медикаменты', cashDb.categories[3]],
        ['Коммуналка', cashDb.categories[4]],
        ['Транспорт', cashDb.categories[5]],
        ['Прочее', cashDb.categories[6]]
    ]);

    // Set chart options
    let options = {
        height: 600,
        width: 800,
        backgroundColor: 'none',
        is3D: true,
        titleTextStyle:
            { color: 'rgb(216, 216, 216)',
        fontSize: 14,
        bold: true},
        legendTextStyle:
            { color: 'rgb(216, 216, 216)',
                fontSize: 14,
                bold: true},
    };

    // Instantiate and draw the chart.
    let chart = new google.visualization.PieChart(document.getElementById ('chart'));

    chart.draw(data, options);
}
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);