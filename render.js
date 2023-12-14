import { getAPI, sendComment} from "./api.js";
import { renderLogin } from "./renderLogin.js";
import {getUser} from "./store.js";


export function renderComments(people) {
  const user = getUser();
  const mailAppHTML = document.querySelector('.container');

  // if (!token) {
  //   const appHTML = `
  //   <div class="add-form">
  //   <input
  //     type="text"
  //     class="add-form-name"
  //     placeholder="Введите ваш логин"
  //     id="add-form-login"
  //     ;
  //   />
  //   <br>
  //   <input
  //     type="text"
  //     class="add-form-name"
  //     placeholder="Введите ваш пароль"
  //     id="add-form-pass"
  //     ;
  //   />
  //     <button class="add-form-button" id="add-button-auth">Войти</button>
  //   </div>
  // </div>

  // </div>`

  // }





  // let date = new Date();
  // let output = String(date.getDate()) + '.' + String(date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

//   console.log(comments.innerHTML);

//   buttonElement.addEventListener('click', () => {
//     if (name.value === "")
//       {
//         name.style.backgroundColor = '#ff7d7d';
//         return;
//       }
//     if (commentText.value === "")
//       {
//         commentText.style.backgroundColor = '#ff7d7d';
//         return;
//       }
//     const oldComments = comments.innerHTML;
//     comments.innerHTML = oldComments + `<li class="comment">
//         <div class="comment-header">
//           <div>${name.value} </div>
//           <div>${output}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">
//             ${commentText.value}
//           </div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter" id="likes-counter">0</span>
//             <button class="like-button" id="likeButton"></button>
//           </div>
//         </div>`



//   const people = [
//     {
//       name: "Глеб Фокин",
//       descr: "Это будет первый комментарий на этой странице",
//       likesAmount: 3,
//       isLike: false,
//       date: "12.02.22 12:18"
//     },
//     {
//       name: "Варвара Н.",
//       descr: "Мне нравится как оформлена эта страница! ❤",
//       likesAmount: 76,
//       isLike: true,
//       date: "13.02.22 19:22"
//     },
//   ];

// });






  console.log(people)
  const likesUlHTML = people
    .map((comment, index) => {
      return `
         <li class="comment">
        <div>${comment.author.name}</div>
              <div>${comment.date}</div>
            
            <div class="comment-body">
              <div class="comment-text" id="answer" data-index=${index}>
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
        <div class="likes" data-like="${index}">
                <span class="likes-counter" id="likes-counter">${comment.likes
        }</span>
                <button class="like-button ${comment.isLiked ? '-active-like' : ''
        }" id="likeButton"></button>
              </div>
            </li>
            `
      // <button class="like-button ${ comment.isLike ? '-active-like' : '' }" id="likeButton"></button>
      //${ comment.isLike ? '-active-like' : '' } это тот же if
    })
    .join('');

  console.log(likesUlHTML)
  const sendCommentFormHtml = `
  <div class="add-form">
  <input
  type="text"
  class="add-form-name"
  placeholder="Имя"
  value="${user?.name}"
  readonly
/>
<br>
<input
  type="text"
  class="add-form-name"
  placeholder="Введите комментарий"
  id="comment-form-input"
/>
<br>
<button class="send-comment-button add-form-button">отправить</button>
<div>
  `
  const appHTML = `
        <ul class="comments" id="comments">
   
        ${likesUlHTML}
    
    
       </ul>
    
    ${user ? sendCommentFormHtml : '<p>чтобы добавить комментарий, <button class="auth-button">авторизуйтесь</button></p>'}    
        `;
  mailAppHTML.innerHTML = appHTML;

  if (!user) {
    const authBtn = document.querySelector('.auth-button');
    authBtn.addEventListener('click', () => {
      renderLogin()
    })
  } else {
    const sendCommentButton = document.querySelector('.send-comment-button');
    sendCommentButton.addEventListener('click', () => {
    const commentValue = document.getElementById("comment-form-input").value
    sendComment(commentValue)
    .then(() => {getAPI()})
  
    })
  }

  const name = document.getElementById("add-form-name");
  const commentText = document.getElementById("add-form-text");
  const comments = document.getElementById("comments");
  const likeButton = document.getElementById("likeButton");
  const likesContainer = document.getElementById("likes-container");
  const addFormTexts = document.getElementById("add-form-text");
  const buttonElement = document.getElementById("add-button");
  // buttonElement.disabled = true;
  // buttonElement.textContent = 'Комментарий загружается...';

  // this.handlinerButton();
  // this.like();
  // this.commentEventListeners();
}