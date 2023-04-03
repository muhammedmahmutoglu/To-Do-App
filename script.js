var arr = [];
var input = document.getElementById("task");
var btn = document.getElementById("btn");
var listWrapper = document.getElementById("listWrapper");
var noTask = document.getElementsByClassName("no-task");
var created = document.getElementById("task-created");
var createdSpan = created.querySelector("span");
var completed = document.getElementById("task-completed");
var completedSpan = completed.querySelector("span");
var checkboxValue = [];

arr = JSON.parse(localStorage.getItem("todoArr")) || [];

function add() {
  if (input.value.trim() !== "") {
    if (arr.indexOf(input.value.trim()) === -1) {
      arr.push(input.value.trim());
      input.value = "";
      localStorage.setItem("todoArr", JSON.stringify(arr));
      render();
    } else {
      alert("Bu görev zaten eklenmiş!");
    }
  } else {
    alert("Boş değer eklenemez!");
  }
}

function render() {
  listWrapper.innerHTML = "";
  var localArr = JSON.parse(localStorage.getItem("todoArr"));
  if (localArr && localArr.length > 0) {
    for (var i = 0; i < localArr.length; i++) {
      var element = `<li>
        <input onclick="checkCheckbox()" type="checkbox" name="checkbox" id="${i}" ${
        localArr[i].checked ? "checked" : ""
      } />
        <label for="${i}">${localArr[i]}</label>
        <div class="balls"></div>
        <button onclick="remove(${i})" id="${i}"><i class="fa-solid fa-trash-can"></i></button>
      </li>`;
      listWrapper.insertAdjacentHTML("beforeend", element);

      var checkbox = document.getElementById(i);
      if (i.checked) {
        checkbox.checked = true;
      }
    }
  }

  beginning();
  checkCheckbox();
  numberTask();
}

btn.addEventListener("click", function () {
  add();
});

window.addEventListener("DOMContentLoaded", function () {
  render();
});

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    add();
    render();
  }
});

function remove(button) {
  var index = parseInt(button);
  arr.splice(index, 1);
  localStorage.setItem("todoArr", JSON.stringify(arr));
  render();
  numberTask();
  beginning();
}

function beginning() {
  let localStorageItems = JSON.parse(localStorage.getItem("todoArr"));
  if (localStorageItems && localStorageItems.length > 0) {
    noTask[0].style.display = "none";
  } else {
    noTask[0].style.display = "flex";
  }
  numberTask();
}

function numberTask() {
  createdSpan.innerText = arr.length;
}

function checkCheckbox() {
  var checkedCount = 0;
  for (var i = 0; i < arr.length; i++) {
    var checkbox = document.getElementById(i);
    if (checkbox.checked) {
      arr[i].checked = true;
      checkedCount++;
    } else {
      arr[i].checked = false;
    }
  }
  localStorage.setItem("todoArr", JSON.stringify(arr));
  completedSpan.innerText = checkedCount;
}
