export function renderLogin() {
  const app = document.querySelector('.container')

  app.innerHTML =
    `
    <div class="add-form">
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
      <button class="add-form-button" id="add-button-auth">Войти</button>
    </div>
  </div>

</div>
    `
}

appEl.innerHTML = appHtml;



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