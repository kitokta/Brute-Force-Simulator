//import { dataBase} from "./modules/pwdDataBase.mjs";
import { dataBase } from "./modules/database.js";

const testBtn = document.getElementById("test-btn");
const password = document.getElementById("password");

//Test button eventlistener
testBtn.addEventListener("click", () => {
  const text = document.getElementById("value");
  //Warning if no password has been writeen
  if (password.value.length < 1) {
    warning("error");
  } else {
    if (text != null) contentBox.removeChild(text);
    //Remove test button while looping and testing the database array
    visibility("remove", testBtn);
    let findPassword = false;
    let i = 0;
    checkPassword(findPassword, i);
  }
});

//sleep function to use in async function(promise)
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

//Visibility function to show or hide some element
function visibility(event, element) {
  event == "show"
    ? element.classList.remove("hide")
    : element.classList.add("hide");
}

//Warning function to write a password
async function warning(type) {
  if (type == "error") {
    visibility("remove", testBtn);
    const warning = document.createElement("h1");
    warning.setAttribute("id", "value");
    warning.style.color = "#fff";
    warning.style.width = "500px";
    warning.style.backgroundColor = "#CC0202";
    warning.innerHTML = "Por favor, digite uma senha!";
    const valueBox = document.getElementById("value-box");
    valueBox.appendChild(warning);
    await sleep(3000);
    valueBox.removeChild(warning);
    visibility("show", testBtn);
  }
}

//checkPassword async function, it iterate through each dataBase index every 10 miliseconds
const checkPassword = async (findPassword, i) => {
  while (findPassword == false) {
    const text = document.createElement("h1");
    text.setAttribute("id", "value");
    text.innerHTML = dataBase[i];
    const valueBox = document.getElementById("value-box");
    valueBox.appendChild(text);
    await sleep(10);
    //If it finds the password, ends the loop
    if (password.value == dataBase[i]) {
      text.style.backgroundColor = "#CC0202";
      findPassword = true;
    } else if (i == dataBase.length) {
      text.style.backgroundColor = "#CC0202";
      findPassword = true;
    } else {
      valueBox.removeChild(text);
      i++;
    }
  }
  //If the password is found in the dataBase array, it isnt safe.
  if (i < dataBase.length) {
    const text = document.getElementById("value");
    const badPwd = document.createElement("h1");
    badPwd.innerHTML = `${dataBase[i]}`;
    badPwd.style.fontSize = "36px";
    text.style.color = "#fff";
    text.style.width = "500px";
    text.innerHTML = "Sua senha não é segura!";
    text.appendChild(badPwd);
    //Try a password with 8 or more characters tip
    if (password.value.length < 8) {
      const warning = document.createElement("h1");
      warning.style.fontSize = "48px";
      warning.innerHTML = "Tente uma senha com mais de 8 caracteres!";
      badPwd.appendChild(warning);
    }
    //await 5 seconds before cleaning the screen
    await sleep(5000);
    const valueBox = document.getElementById("value-box");
    valueBox.removeChild(text);
    visibility("show", testBtn);
  }
  //If password is safe:
  else {
    const text = document.getElementById("value");
    const goodPwd = document.createElement("h1");
    goodPwd.innerHTML = password.value;
    goodPwd.style.fontSize = "36px";
    text.style.backgroundColor = "#18B4AE";
    text.style.color = "#fff";
    text.style.width = "500px";
    text.innerHTML = "Parabéns, sua senha é segura!";
    //We check here too for a <8 characters password, so we can tip for a more consistent one.
    if (password.value.length < 8) {
      text.innerHTML += " Mas tente adicionar mais caracteres!";
    }
    text.appendChild(goodPwd);
    await sleep(5000);
    const valueBox = document.getElementById("value-box");
    valueBox.removeChild(text);
    visibility("show", testBtn);
  }
};
