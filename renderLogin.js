import { renderForm } from "./renderForm";

export function renderLogin() {
  let isLoginMod = true;
  const renderForm = () => {
  const app = document.querySelector('.container')

  app.innerHTML =
    `
    <div> ${isLoginMod ? 'Вход' : 'Регистрация'}
    <div class="add-form">
    ${isLoginMod ? '' : `<input
    type="text"
    class="user-name"
    placeholder="Введите ваше имя"
    id="add-form-name"
    ;
  />`}

    <br>
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваш логин"
      id="add-form-login"
      ;
    />
    <br>
    <input
      type="password"
      class="add-form-name"
      placeholder="Введите ваш пароль"
      id="add-form-pass"
      ;
    />
      <button class="add-form-button" id="add-button-auth">${isLoginMod ? 'Войти' : 'Зарегистрироваться'}</button>
      <button class="add-form-button toggle-btn" id="add-button-auth">${isLoginMod ? 'К регистрации' : 'ко входу'}</button>
    </div>
  </div>

</div>
</div>
    `
}

// appEl.innerHTML = appHtml;


document.getElementById("toggle-btn").addEventListener("click", () => {
  isLoginMod = !isLoginMod;
});







document.getElementById("add-button-auth").addEventListener("click", () => {
  const login = document.getElementById("add-form-login").value;
  const password = document.getElementById("add-form-pass").value;

  if(!login){
    alert('Введите логин');
    return;
  }

  if(!password){
    alert('Введите пароль');
    return;
  }

  loginUserApi({
    login: login,
    password: password,
  }).then((user) => {

  setToken(`Bearer ${user.user.token}`);
  fetchTodosAndRender();
    

  }).catch(erroe => {
    //TODO: Выводить alert красиво
    alert(error.message)
  })

  
});
renderForm();
}