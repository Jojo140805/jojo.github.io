document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate Date of Birth
    const age = calculateAge(new Date(dob));
    if (age < 18 || age > 55) {
        alert('Date of Birth must be between 18 and 55 years.');
        return;
    }

    // Save user data in local storage
    const user = { name, email, password, dob, terms };
    saveUserData(user);
    addUserToTable(user);

    // Reset form
    document.getElementById('registrationForm').reset();
});

function calculateAge(dob) {
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
}

function saveUserData(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => addUserToTable(user));
}

function addUserToTable(user) {
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const row = userTable.insertRow();

    row.insertCell(0).innerHTML = user.name;
    row.insertCell(1).innerHTML = user.email;
    row.insertCell(2).innerHTML = user.password;
    row.insertCell(3).innerHTML = user.dob;
    row.insertCell(4).innerHTML = user.terms ? 'Yes' : 'No';
}

// Load saved data on page load
window.onload = loadUsers;
