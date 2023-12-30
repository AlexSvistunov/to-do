const input = document.querySelector('.ex__field');
const addBtn = document.querySelector('.ex__add-btn');
const form = document.querySelector('.ex__form');
const list = document.querySelector('.ex__list');
const arrayOfObjects = [];

function renderLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem(0));
  arrayOfObjects.push(storedTasks);
  for (let i = 0; i < arrayOfObjects.length; i++) {
    addTask(arrayOfObjects[i])
  }
  
}

renderLocalStorage();

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const value = input.value;
  const obj = {
    task: `${value}`,
    isFinished: false,
  }

  if(value) {
    addTask(obj);
  }
});


function template(obj, index) {
  return `
  <li class="ex__element" data-el="${index}">
    ${obj.task}

    <div class="ex__buttons">
      <button class="ex__finish">Пометить как выполненное</button>
      <button class="ex__delete">Удалить задачу из списка</button>
    </div>
  </li>
  `
}


function addTask(obj) {
  const index = arrayOfObjects.length;
  list.insertAdjacentHTML('beforeend', template(obj, index))
  arrayOfObjects.push(obj);
  input.value = '';

  (function taskToLocal(index) {

    localStorage.setItem(String(index), JSON.stringify(obj))

  })(index)

}

//add task to array and add task to html

function deleteTask(obj) {
    const index = obj.closest('.ex__element').dataset.el;
    arrayOfObjects.splice(index, 1);
    list.innerHTML = '';
    for (let i = 0; i < arrayOfObjects.length; i++) {
      list.insertAdjacentHTML('beforeend', template(arrayOfObjects[i], i));
    }
  
  //It's probably not right!!!

}

function getDone(obj) {
  const index = obj.closest('.ex__element').dataset.el;
  arrayOfObjects[index].isFinished = true;
  const el = obj.closest('.ex__element');
  el.style.textDecoration = 'line-through';
  el.style.color = 'green';


}

list.addEventListener('click', function(e) {
  const currentTarget = e.target;
  if(currentTarget.classList.contains('ex__delete'))  {
    deleteTask(currentTarget)
  }

  if(currentTarget.classList.contains('ex__finish')) {
    getDone(currentTarget);
  }

});
















