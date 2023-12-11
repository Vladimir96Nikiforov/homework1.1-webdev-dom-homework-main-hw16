//https://github.com/Vladimir96Nikiforov/homework1.1-webdev-dom-homework-main


import { getToken } from "./store.js";
import { renderComments } from "./render.js";

const host = 'https://wedev-api.sky.pro/api/v2/Vladimir-Nikiforov/comments';

const loginUrl = 'https://wedev-api.sky.pro/api/user/login';
const registerUserUrl = 'https://wedev-api.sky.pro/api/user';


export function getAPI() {
    const fetchPromiseGet = fetch(
        host,
        {
            method: 'GET',
            headers: {
                Authorization: getToken(),
            }
        }
    );
    fetchPromiseGet
        .then((response) => {
            if (response.status === 401) {
                const pass = prompt("Введите верный пароль");
                renderComments();
                throw new Error("нет авторизации")
            }
            if (response.status === 500) {
                /* текст ошибки */
                throw new Error('Ошибка 500');
            }
            /*возвращаем данные при успешном выполнеии запроса*/
            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
            //    people = responseData.comments; //comments это ключ массива в документации
            renderComments(responseData.comments);
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';

            /* расшифровка ошибки */

            if (error.message === 'Ошибка 500') {
                alert('Ошибка сервера, попробуйте позже');
                /*return, ибо проверять другие ошибки уже будет не нужно */
                return;
            }

            alert('Кажется, у вас сломался интернет, попробуйте позже');

            console.log(error);
        });
}



export function postAPI() {
    const buttonElement = document.getElementById("add-button");
    const commentText = document.getElementById("add-form-text");

    buttonElement.disabled = true;
    buttonElement.textContent = 'Элемент добавляется...';
    fetch(
        host,
        {
            method: 'POST',
            headers: {
                Authorization: getToken(),
            },
            body: JSON.stringify({
                text: commentText.value,
                name: name.value,
                forceError: true, //добавили при 500 ошибке
            }),
        }
    )
        .then((response) => {
            if (!response.ok) {
                /* Имеет смысл задавать короткое название ошибок, так как дальше мы будем их разбирать */
                if (response.status === 500) {
                    throw new Error('Ошибка 500');
                } else if (response.status === 400) {
                    throw new Error('Ошибка 400');
                }
            }

            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
            getAPI();
        })
        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
            commentText.value = '';
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';

            /* расшифровка ошибки */

            if (error.message === 'Ошибка 500') {
                alert('Ошибка сервера, попробуйте позже');
                /*return, ибо проверять другие ошибки уже будет не нужно */
                return;
            }

            if (error.message === 'Ошибка 400') {
                /*причина этой ошибки */
                alert('Имя и комментарий должны быть не короче 3 символов');
                return;
            }

            alert('Кажется, у вас сломался интернет, попробуйте позже');

            console.log(error);
        });
}


export function loginUserApi(login, password) {
    return fetch(
        loginUrl,
        {
            method: 'POST',
            body: JSON.stringify({
                login,
                password,
            }),
        }).then((response) =>{
            if(response.status === 400){
                throw new Error('Неверный логин или пароль')
            }
            return response.json();
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';

            /* расшифровка ошибки */

            if (error.message === 'Ошибка 500') {
                alert('Ошибка сервера, попробуйте позже');
                /*return, ибо проверять другие ошибки уже будет не нужно */
                return;
            }

            if (error.message === 'Ошибка 400') {
                /*причина этой ошибки */
                alert('Уже существует');
                return;
            }

            alert('Кажется, у вас сломался интернет, попробуйте позже');

            console.log(error);
        });

}
export function registerUserApi(login, name, password) {
    return fetch(
        registerUserUrl,
        {
            method: 'POST',
            body: JSON.stringify({
                login,
                name,
                password,
            }),
        }).then((response) =>{
            if(response.status === 400){
                throw new Error('Неверный логин или пароль')
            }
            return response.json();
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';

            /* расшифровка ошибки */

            if (error.message === 'Ошибка 500') {
                alert('Ошибка сервера, попробуйте позже');
                /*return, ибо проверять другие ошибки уже будет не нужно */
                return;
            }

            if (error.message === 'Ошибка 400') {
                /*причина этой ошибки */
                alert('Неверный логин или пароль');
                return;
            }

            alert('Кажется, у вас сломался интернет, попробуйте позже');

            console.log(error);
        });

}
export function sendComment(text){
    return fetch(
        host,
        {
            method: 'POST',
            body: JSON.stringify({
                text,
            }),
            headers: {
                Authorization: getToken(),
            }
        }).then((response) =>{
            if(response.status === 400){
                throw new Error('Неверный логин или пароль')
            }
            return response.json();
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';

            /* расшифровка ошибки */

            if (error.message === 'Ошибка 500') {
                alert('Ошибка сервера, попробуйте позже');
                /*return, ибо проверять другие ошибки уже будет не нужно */
                return;
            }

            if (error.message === 'Ошибка 400') {
                /*причина этой ошибки */
                alert('Имя и комментарий должны быть не короче 3 символов');
                return;
            }

            alert('Кажется, у вас сломался интернет, попробуйте позже');

            console.log(error);
        });
}