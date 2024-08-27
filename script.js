"use strict";
//Holding The Main Task Inputs
const taskInp = document.getElementById("taskName");
const addBtn = document.getElementById("addTask");
const tasksField = document.querySelector(".tasks-field");
let tasksArr = [];

//step 1 to create an task
function createTask() {
  const taskObj = {
    id: Date.now(),
    name: taskInp.value,
  };
  tasksArr.push(taskObj);
  localStorage.setItem("tasksArray", JSON.stringify(tasksArr));
  taskInp.value = "";
}

// Step 2 Render The Tasks into DOM
function renderTasks() {
  if (localStorage.getItem("tasksArray")) {
    tasksArr = JSON.parse(localStorage.getItem("tasksArray"));
  } else {
    false;
  }
  let taskHolder = "";
  for (let i = 0; i < tasksArr.length; i++) {
    taskHolder += `
      <div class="task">
      <p>${tasksArr[i].name}</p>
      <button ="deleteTask" data-id="${tasksArr[i].id}">Delete</button>
      </div>
    `;
  }
  tasksField.innerHTML = taskHolder;
  generateDeleteBtn();
}
renderTasks();

//Create Function To Generate Delete Buttons Inside The Task
function generateDeleteBtn() {
  const deleteBtns = Array.from(document.querySelectorAll(".task button"));
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.parentElement.remove();
      tasksArr = tasksArr.filter((task) => {
        return task.id !== +btn.dataset.id;
      });
      localStorage.setItem("tasksArray", JSON.stringify(tasksArr));
    });
  });
}

//Create A Validation Function
function inputValidaton() {
  if (taskInp.value !== "") {
    createTask();
    renderTasks();
  } else {
    false;
  }
}

// Step 3 Create Function to the Add Button
addBtn.addEventListener("click", inputValidaton);
