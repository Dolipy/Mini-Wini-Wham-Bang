'use strict'
const search = document.querySelector('#search');
const empty = document.querySelector('.empty');
const add = document.querySelector('#addBtn');
const remove = document.querySelector('#removeBtn');
const lildiv = document.querySelector('.div_mini');

add.onclick = function () {
    if (search.value.trim() === "") return; // Prevent empty additions

    const p = document.createElement('p');
    p.textContent = search.value;
    p.classList.add('list-item'); // Add class for styling

    // Optional: Click to remove specific item
    p.onclick = function () {
        this.remove();
    }

    empty.appendChild(p);
    search.value = "";
    search.focus();
};

remove.onclick = function () {
    if (empty.lastElementChild) {
        empty.removeChild(empty.lastElementChild);
    }
};

// Allow 'Enter' key to add item
search.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        add.click();
    }
});