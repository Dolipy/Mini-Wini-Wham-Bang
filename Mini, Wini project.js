'use strict';

const search = document.querySelector('#search');
const empty = document.querySelector('.empty');
const add = document.querySelector('#addBtn');
const remove = document.querySelector('#removeBtn');
const lildiv = document.querySelector('.div_mini');

// ─── Helper: Update empty-state message ───
function updateEmptyState() {
    const items = empty.querySelectorAll('.list-item');
    let emptyMsg = empty.querySelector('.empty-state');

    if (items.length === 0 && !emptyMsg) {
        emptyMsg = document.createElement('p');
        emptyMsg.classList.add('empty-state');
        emptyMsg.textContent = 'Your list is empty — add something!';
        empty.appendChild(emptyMsg);
    } else if (items.length > 0 && emptyMsg) {
        emptyMsg.remove();
    }
}

// ─── Helper: Create sparkle particles ───
function createSparkles(button) {
    const rect = button.getBoundingClientRect();
    const colors = ['#7f5af0', '#e84393', '#fd79a8', '#2cb67d', '#6c63ff'];

    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('span');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${rect.left + rect.width / 2}px`;
        sparkle.style.top = `${rect.top + rect.height / 2}px`;
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

        const angle = (Math.PI * 2 * i) / 8;
        const distance = 30 + Math.random() * 40;
        sparkle.style.setProperty('--sparkle-x', `${Math.cos(angle) * distance}px`);
        sparkle.style.setProperty('--sparkle-y', `${Math.sin(angle) * distance}px`);

        document.body.appendChild(sparkle);

        sparkle.addEventListener('animationend', () => sparkle.remove());
    }
}

// ─── Helper: Animated removal of a single item ───
function animateRemoval(item) {
    item.classList.add('removing');
    item.addEventListener('animationend', () => {
        item.remove();
        updateEmptyState();
    });
}

// ─── ADD button ───
add.onclick = function () {
    if (search.value.trim() === '') return;

    const p = document.createElement('p');
    p.textContent = search.value;
    p.classList.add('list-item');

    // Click-to-remove with animation
    p.onclick = function () {
        animateRemoval(this);
    };

    empty.appendChild(p);
    updateEmptyState();
    createSparkles(add);

    search.value = '';
    search.focus();
};

// ─── REMOVE button (last item) ───
remove.onclick = function () {
    const items = empty.querySelectorAll('.list-item');
    if (items.length > 0) {
        animateRemoval(items[items.length - 1]);
    }
};

// ─── Enter key to add ───
search.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        add.click();
    }
});