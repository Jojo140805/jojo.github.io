document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('registrationForm');
    const tableBody = document.getElementById('tableBody');

    // Load saved data from localStorage on page load
    loadSavedData();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        // Validate date of birth (between 18 and 55 years)
        if (!validateDob(dob)) {
            alert('Date of Birth must be between 18 and 55 years.');
            return;
        }

        // Save the data in localStorage
        const registration = {
            name,
            email,
            password,
            dob,
            terms
        };

        saveData(registration);
        addEntryToTable(registration);
        form.reset();
    });

    function validateDob(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        if (
            monthDifference < 0 || 
            (monthDifference === 0 && today.getDate() < dobDate.getDate())
        ) {
            age--;
        }
        return age >= 18 && age <= 55;
    }

    function saveData(registration) {
        let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        registrations.push(registration);
        localStorage.setItem('registrations', JSON.stringify(registrations));
    }

    function loadSavedData() {
        const savedRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
        savedRegistrations.forEach(addEntryToTable);
    }

    function addEntryToTable({ name, email, password, dob, terms }) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${password}</td>
            <td>${dob}</td>
            <td>${terms ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    }
});
