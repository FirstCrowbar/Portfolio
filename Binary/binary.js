let first = document.getElementById("first"),
    last = document.getElementById("last"),
    key = document.getElementById("key"),
    form = document.getElementById("form"),
    output = document.getElementById("output"),
    arr = [],
    textContainer = [];

//Функция вывода этапов бинарного поиска
function result(text) {
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('innerDiv');
    output.append(resultContainer);
    resultContainer.innerHTML = `<p>${text}</p>`;
}


function binarySearch(sortedArray, key) { //аргументы: отсортированный массив и искомое число
    let start = 0;
    let end = sortedArray.length - 1;

    //Очистка вывода
    output.innerHTML = `
        <h4>РЕЗУЛЬТАТ ПОИСКА</h4>`;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2); //среднее значение хранится в переменной
        //Если среднее значение равно искомому, вернуть среднее значение
        if (sortedArray[middle] === key) {
            result(`${key} равно среднему числу ${sortedArray[middle]}, поиск завершён`);
            // console.log(`${key} равно среднему числу ${sortedArray[middle]}, поиск завершён`);
            return middle;
        //Если сред. знач. меньше искомого, делим массив пополам и берем Большую часть
        } else if (sortedArray[middle] < key) {
            result(`${key} больше чем сред. число ${sortedArray[middle]}, отсекаем меньшую половину`);
            // console.log(`${key} больше чем сред. число ${sortedArray[middle]}, отсекаем меньшую половину`);
            start = middle + 1;
        //Иначе (если сред. знач. больше искомого) берём меньшую часть
        } else {
            result(`${key} меньше чем сред. число ${sortedArray[middle]}, отсекаем большую половину`);
            // console.log(`${key} меньше чем сред. число ${sortedArray[middle]}, отсекаем большую половину`);
            end = middle - 1;
        }
    }
}


form.addEventListener('submit', (event) => {
    //Фильтрация вводных данных
    if (isNaN(first.value) || isNaN(last.value) || isNaN(key.value)) {
        alert("введите число");
    } else {
        event.preventDefault();
        arr = [];
        for(let i = +first.value; i <= +last.value; i++) {
            arr.push(i);
        }
        binarySearch(arr, +key.value);
        // console.log(key.value);
    }

});