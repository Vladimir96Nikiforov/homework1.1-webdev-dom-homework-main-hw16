import { getAPI, loginUserApi, registerUserApi } from "./api.js";
import { setToken } from "./index.js";
import { renderForm } from "./renderForm.js";

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
      <button class="add-form-button toggle-btn">${isLoginMod ? 'К регистрации' : 'ко входу'}</button>
    </div>
  </div>

</div>
</div>
    `


// appEl.innerHTML = appHtml;

console.log(document.querySelector(".toggle-btn"));
document.querySelector(".toggle-btn").addEventListener("click", () => {
  isLoginMod = !isLoginMod;
  renderForm();
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



   if(isLoginMod){
    loginUserApi(login, password).then((res) => {
      setToken(`Bearer ${res.user.token}`);
      getAPI();
        
    
      }).catch(error => {
        //TODO: Выводить alert красиво
        alert(error.message)
      })
   }
   else{
    const name = document.getElementById("add-form-name").value;

    if(!name){
      alert('Введите имя');
      return;
    }

    registerUserApi(login, name, password).then((res) => {

      setToken(`Bearer ${res.user.token}`);
      getAPI();
        
    
      }).catch(error => {
        //TODO: Выводить alert красиво
        alert(error.message)
      })

   }



  

  
});
}
renderForm();
}





