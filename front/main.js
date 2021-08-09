window.onload = function () {
  document.body.classList.add("loaded");
};
sendForm.onclick = function () {
  let form = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    number: document.getElementById("number").value
  };

  validate(form)
    .then(r => {
      let f = ["name", "email", "number"];
      f.map(item => {
        let x = document.querySelector(`.form > div > #${item}`);
        x.style.border = "none";
      });
      form.action = "send_email_message";
      $.ajax({
        method: "POST",
        url: "components/server.php",
        data: form,
        success: function (r) {
          console.log(r);
          let msg = document.getElementById("msg");
          if (r == "true") {
            msg.innerHTML = "Заявка принята";
            msg.style.color = "black";
            let input = document.querySelectorAll(`.form > div > input`);
            for (let i = 0; i < input.length; i++) {
              input[i].value = "";
            }
          } else if (r == "#404127") {
            msg.innerHTML = "Серверное Проблема";
            msg.style.color = "red";
          } else {
            msg.innerHTML = "Что то пошло не так";
            msg.style.color = "red";
          }
        }
      });
    })
    .catch(r => {
      showErrorValidate(r);
    });
};

function validateName(name) {
  let re = /^([a-zа-яё]+|\d+)$/i;
  return re.test(name);
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validateNumber(number) {
  //   const n = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const n = /11|[1-9]\d?/;
  return n.test(number);
}
function validate(obj) {
  return new Promise((resolve, reject) => {
    let arr = [];
    for (let key in obj) {
      if (!obj[key]) {
        arr.push(key);
      }
      if (arr.length > 0) {
        reject({ emptyKeys: arr });
      }
    }
    if (!validateName(obj.name)) {
      reject("name_validate");
    }
    if (!validateEmail(obj.email)) {
      reject("email_validate");
    }
    if (!validateNumber(obj.number)) {
      reject("number_validate");
    }
    resolve(obj);
  });
}
function showErrorValidate(r) {
  let form = ["name", "email", "number"];
  form.map(item => {
    let x = document.querySelector(`.form > div > #${item}`);
    x.style.border = "none";
  });
  if (typeof r == "object") {
    r.emptyKeys.map(item => {
      let x = document.querySelector(`.form > div > #${item}`);
      x.style.border = "solid red 1px";
    });
  } else if (r == "name_validate") {
    let msg = document.getElementById("msg");
    msg.innerHTML = "Введенное имя поля не соответствует соглашениям об именах";
    msg.style.color = "red";
    let div = document.querySelector(`.form > div  #name`);
    div.style.border = "solid red 1px";
  } else if (r == "email_validate") {
    let x = document.querySelector(`.form > div  #email`);
    x.style.border = "solid red 1px";
  } else if (r == "number_validate") {
    let x = document.querySelector(`.form > div  #number`);
    x.style.border = "solid red 1px";
  }
}

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      if (change.target.className == "row logo") {
        let divLogo = document.querySelectorAll(".logo > div > img");
        let count = 0;
        divLogo[count].classList.add("scale-up-tl");
        count += 1;
        function addStyle() {
          divLogo[count].classList.add("scale-up-tl");
          count += 1;
          if (count >= 12) {
            clearInterval(myset);
          }
        }
        let myset = setInterval(addStyle, 300);
        return;
      } else {
        change.target.classList.add("element-show");
      }
    }
    // else {
    //   change.target.classList.remove("element-show");
    // }
  });
}

let options = {
  threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elmAnimate = {
  start: document.querySelectorAll(".start"),
  uslugi: document.querySelectorAll(".service_div_usl"),
  show: document.querySelectorAll(".live"),
  btn: document.querySelectorAll(".btn"),
  logo: document.querySelectorAll(".logo")
};

for (let key in elmAnimate) {
  for (let item of elmAnimate[key]) {
    observer.observe(item);
  }
}
