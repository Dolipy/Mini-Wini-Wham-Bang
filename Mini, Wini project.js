'use strict'
const search = document.querySelector('#search');
const empty = document.querySelector('.empty');
const add = document.querySelector('#addBtn');
const remove = document.querySelector('#removeBtn');
const lildiv = document.querySelector('.div_mini');

add.onclick = function() {
    empty.innerHTML += "<p>" + search.value + "</p>";
    search.value = "";
};