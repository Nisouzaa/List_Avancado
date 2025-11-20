// Seleção de eventos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputvalue;

// Funções
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  // 1º Btn
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  todo.appendChild(doneBtn);

  // 2º Btn
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  todo.appendChild(editBtn);

  // 3º Btn
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
};

const toggleForm = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    console.log(todoTitle, text);

    if (todoTitle.innerText === oldInputvalue) {
      todoTitle.innerText = text;
    }
  });
};

// busca
const getSearchTodos = (search) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    const normalizedSearch = search.toLowerCase();

    //mostrando todos antes de filtrar
    todo.style.display = "flex";

    //se não incluir o termo, esconde
    if (!todoTitle.includes(normalizedSearch)) {
      todo.style.display = "none";
    }
  });
};

// Evenetos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parantEl = targetEl.closest("div");
  let todoTitle;

  if (parantEl && parantEl.querySelector("h3")) {
    todoTitle = parantEl.querySelector("h3").innerHTML;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parantEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("remove-todo")) {
    parantEl.remove();
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForm();

    editInput.value = todoTitle;
    oldInputvalue = todoTitle; // Salvando titulo do todo
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForm();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForm();
});

// busca
searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchTodos(search);
});

// botão apagar
eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = " ";

  searchInput.dispatchEvent(new Event("keyup"));
});

//filtro
filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  console.log(filterValue);
});
