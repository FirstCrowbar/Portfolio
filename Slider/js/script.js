const slides = document.querySelectorAll('.slide'),
    description = document.querySelectorAll('.slide-description'),
    descriptionContainer = document.querySelector('#description-container');
    slider = document.querySelector('.slider'),
    prev = document.querySelector('.slider-prev'),
    next = document.querySelector('.slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.slider-wrapper'),
    slidesField = document.querySelector('.slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width; //Получаем свойства сгенерированного в окне элемета
let slideIndex = 1;
let offset = 0;

//Стартовые показания счётчика
if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

//Стилевая настройка поля видимости
slidesField.style.width = 100 * slides.length + '%'; //Ширина видимого поля = ширина суммы изображений (в процентах)
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all'; //Плавность смены вида
slidesWrapper.style.overflow = 'hidden'; //Скрываем все элементы, что не попадают в зону видимости
slides.forEach(slide => {
    slide.style.width = width; //Устанавливаем одну ширину для всех слайдов
});
slider.style.position = 'relative'; //Все абсолютно ориентированные элементы внутри будут отображены нормально

//Делаем большую обёртку для всех элементов
const indicators = document.createElement('ol');
const dots = [];
indicators.classList.add('carousel-indicators');
slider.append(indicators);

addDescription(description[slideIndex - 1]); //Вставка первого описания

//Функция смещения слайдов
function transformX(direction) {
    //Проверяем аргументы (вправо или влево)
    if (direction === "+") {
        //Вычисляем длину (в px), на которую произойдёт смещение
        if (offset === +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        //Меняем индекс текущего слайда
        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
    } else if (direction === "-") {
        //Вычисляем длину (в px), на которую произойдёт смещение
        if (offset === 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '')
        }
        //Меняем индекс текущего слайда
        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
    }
    //Если число в счётчике однозначное, добавляем к нему текстовый нолик
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    slidesField.style.transform = `translateX(-${offset}px)`; //Смещение влево на _ пикселей
    dots.forEach(dot => dot.style.opacity = '.5'); //По умолчанию, прозрачность всех точек в массиве - 0.5%
    dots[slideIndex - 1].style.opacity = '1'; //Но для активного элемента - 1%
    addDescription(description[slideIndex - 1]);
}

//Триггеры нажатия на стрелки
next.addEventListener('click', () => {
    transformX("+");
    });
prev.addEventListener('click', () => {
    transformX("-");
});

//Основываясь на количестве слайдов, создаём точки
for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i === 0) { //Для стартового элемента - прозрачность точки - 1%
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot); //Добавляем элементы в массив
}

//Смещение при кликах на точки
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = +width.replace(/\D/g, '') * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        dots.forEach(dot => dot.style.opacity = '.5'); //По умолчанию, прозрачность всех точек в массиве - 0.5%
        dots[slideIndex - 1].style.opacity = '1'; //Но для активного элемента - 1%
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    })
});

//Вставка описания
function addDescription(text) {
    descriptionContainer.innerHTML = "";
    descriptionContainer.prepend(text);
}