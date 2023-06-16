const form = document.getElementById('myForm');
const tableBody = document.getElementById('data-body');
const saveButton = document.getElementById('saveButton');
const deleteButton = document.getElementById('deleteButton');


saveButton.addEventListener('click', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;

    const data = {
        firstName: firstName,
        lastName: lastName,
        age: age
    };
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];
    savedData.push(data);
    localStorage.setItem('formData', JSON.stringify(savedData));

    renderTable();

    form.reset();
});


deleteButton.addEventListener('click', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];

    const index = savedData.findIndex((data) => {
        return (
            data.firstName === firstName &&
            data.lastName === lastName &&
            data.age === age
        );
    });

    if (index !== -1) {
        savedData.splice(index, 1);
        localStorage.setItem('formData', JSON.stringify(savedData));
        renderTable();
    }

    form.reset();
});

function renderTable() {
    tableBody.innerHTML = '';
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];
    savedData.forEach((data) => {
        const row = document.createElement('tr');
        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = data.firstName;
        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = data.lastName;
        const ageCell = document.createElement('td');
        ageCell.textContent = data.age;

        row.appendChild(firstNameCell);
        row.appendChild(lastNameCell);
        row.appendChild(ageCell);

        tableBody.appendChild(row);
    });
}

renderTable();
