let tabMain = document.querySelector("#tabMain"); //Главный блок таблицы
let studentsDB = {                            //База данных со списком студентов
    names: [],
    faculties: [],
    years: [],
    ratings: [],
}

//_________________________________________________________________________________________
//ОБЪЕКТ-КОНСТРУКТОР НОВОГО ЭЛЕМЕНТА
class Item {
    constructor(name, faculty, year, rating, num) {
        this.name = name;
        this.faculty = faculty;
        this.year = year;
        this.rating = rating;
        this.num = num;
    }
    addStudent() {
        tabMain.innerHTML += `
   <tr id="item${this.num}">
        <td class="square">${this.num}</td>
        <td id="itemName">${this.name}</td>
        <td id="itemFaculty">${this.faculty}</td>
        <td id="itemYear">${this.year}</td>
        <td id="itemRating">${this.rating}</td>
        <td id="itemDel" class="delete0"><i id="del${this.num}" class="fa fa-trash" aria-hidden="true"></i></td>
    </tr>`
    }
}

//________________________________________________________________________________
//МАНИПУЛЯЦИИ С ЭЛЕМЕНТАМИ ТАБЛИЦЫ
//Создание списка студентов на базе прототипа
function newStudent() {
    //Очистка предыдущего содержимого таблицы
    tabMain.innerHTML = "";
    tabMain.innerHTML = `
    <tr>
        <th class="square">№</th>
        <th>Фамилия, И.О</th>
        <th>Факультет</th>
        <th>Курс</th>
        <th>Рейтинг</th>
        <th class="square"></th>
    </tr>`;
    //Создание новых элементов на базе конструктора
    studentsDB.names.forEach((name, i) => {
        const student = new Item(
            studentsDB.names[i],
            studentsDB.faculties[i],
            studentsDB.years[i],
            studentsDB.ratings[i],
            [i + 1],
        )
        student.addStudent();
    })
}
//Удаление студента
function deleteStudent() {
    document.querySelectorAll('.fa-trash').forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.parentElement.parentElement.parentElement.remove();
            studentsDB.names.splice(i, 1);
            studentsDB.faculties.splice(i, 1);
            studentsDB.years.splice(i, 1);
            studentsDB.ratings.splice(i, 1);
            newStudent(); //Обновление списка в таблице
            deleteStudent(); //Обновление селекторов для удаления
            // shiftRow(); //Обновление селекторов для выделения
        })
    })
}

//__________________________________________________________________________
//ОТПРАВКА ДАННЫХ С ФОРМЫ В МАССИВ, ОЧИСТКА ТАБЛИЦЫ
function formToArr() {
    let formContainer = document.querySelector('#form')
    let errMsg = document.querySelector('#errMsg')
    let form = {
        name: document.querySelector("#inputName"),
        faculty: document.querySelector("#inputFaculty"),
        year: document.querySelector("#inputYear"),
        rating: document.querySelector("#inputRating"),
    }
    if (form.name.value === "" || form.faculty.value === "" || form.year.value === "" || form.rating.value === "")  {
        formContainer.style.backgroundColor = "red";
        errMsg.innerText = "Заполните все поля!";
    } else {
        if (isNaN(form.year.value) || isNaN(form.rating.value)) {
            formContainer.style.backgroundColor = "red";
            errMsg.innerText = "Курс и рейтинг должны иметь числовое значение!";
            form.year.value = "";
            form.rating.value = "";
            } else {
            //Добавление данных с формы в массив
            studentsDB.names.push(form.name.value);
            studentsDB.faculties.push(form.faculty.value);
            studentsDB.years.push(+form.year.value);
            studentsDB.ratings.push(+form.rating.value);
            //Очистка содержимого формы
            form.name.value = "";
            form.faculty.value = "";
            form.year.value = "";
            form.rating.value = "";
            errMsg.innerText = "";
            formContainer.style.backgroundColor = "rgba(200, 200, 200, 0.9)";
            newStudent(); //Обновление списка в таблице
            deleteStudent(); //Обновление селекторов для удаления
            // shiftRow(); //Обновление селекторов для выделения
        }

    }

}
//Триггер отправки в массив
let inputBtn = document.querySelector("#inputBtn");
inputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formToArr();
})

//____________________________________________________________________________
//ВЫДЕЛЕНИЕ СТРОК
function shiftRow(td) {
    let tr = td.closest('tr');
    let del = tr.lastElementChild;
    if (tr.classList.contains('red')) {
        tr.classList.remove('red');
        del.classList.remove('delete');
        del.classList.add('delete0');
    } else {
        tr.classList.add('red');
        del.classList.remove('delete0');
        del.classList.add('delete');
    }
}
let table = document.querySelector('table');
table.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName === 'TD') {
        shiftRow(target);
    }
})



