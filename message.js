
//____________________________________________________________________________________
//БЛОК ОТПРАВКИ ФОРМЫ
let modal_form = document.querySelector('#modal_form');
let connect_btn = document.querySelector('#connect_btn');
let modal_close_btn = document.querySelector('#modal_close_btn');
let thanks_modal = document.querySelector('#thanks_modal');
let submit_btn = document.querySelector('#submit_btn');
let submit_btn_modal = document.querySelector('#submit_btn_modal');
let modal_thanks_close_btn = document.querySelector('#modal_thanks_close_btn');
let form = document.querySelector('#form');
let thanks = document.querySelector('#thanks');
let sending = false;
let modal = false;
//Функция открытия модального окна
function modalOpen() {
    if (sending === false) {
        modal_form.style.display = "block";
        modal_form.classList.add('show', 'fade');
    } else {
        thanks_modal.style.display = "block";
        thanks_modal.classList.add('fade');
    }
}
//Функция закрытия модального окна
function modalClose() {
    // modal_form.style.display = "none";
    thanks_modal.style.display = "none";
    modal_form.style.display = "none";
    thanks_modal.classList.add('fade_close');
    modal_form.classList.add('fade_close');
}
//Триггеры открытия и закрытия модального окна
connect_btn.addEventListener('click', modalOpen);
modal_close_btn.addEventListener('click', modalClose);
modal_thanks_close_btn.addEventListener('click', modalClose);
modal_form.addEventListener('click', (e) => {
    if (e.target === modal_form) {
        modalClose();
    }
})
thanks_modal.addEventListener('click', (e) => {
    if (e.target === thanks_modal) {
        modalClose();
    }
})
document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
        modalClose();
    }
})

//Функция отправки формы
function send(name, email, message) {
    sending = true;
    form.style.display = "none";
    if (modal === true) {
        thanks_modal.style.display = "block";
        thanks.style.display = "block";
        console.log(name + "_" + email + "_" + message);
    } else {
        thanks.style.display = "block";
        console.log(name + "_" + email + "_" + message);
    }
}
//Триггеры отправки
// submit_btn_modal.addEventListener('click', (e) => {
//     e.preventDefault();
//     modal = true;
//     send(document.querySelector("#modal_name").value, document.querySelector("#modal_email").value, document.querySelector("#modal_message").value);
// });
// submit_btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     modal = false;
//     send(document.querySelector("#name").value, document.querySelector("#email").value, document.querySelector("#message").value);
// });
