const form = document.getElementById('food-form');
const nameInput = document.getElementById('name');
const calInput = document.getElementById('calories');
const list = document.getElementById('food-list');
const totalDisplay = document.getElementById('total');

let foods = JSON.parse(localStorage.getItem('foods')) || [];

function updateList() {
  list.innerHTML = '';
  let total = 0;
  foods.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name}: ${item.cal} kcal`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Entfernen';
    removeBtn.onclick = () => {
      foods.splice(index, 1);
      saveAndUpdate();
    };
    li.appendChild(removeBtn);
    list.appendChild(li);
    total += item.cal;
  });
  totalDisplay.textContent = total;
}

function saveAndUpdate() {
  localStorage.setItem('foods', JSON.stringify(foods));
  updateList();
}

form.onsubmit = (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const cal = parseInt(calInput.value);
  if (!name || isNaN(cal)) return;
  foods.push({ name, cal });
  nameInput.value = '';
  calInput.value = '';
  saveAndUpdate();
};

updateList();
