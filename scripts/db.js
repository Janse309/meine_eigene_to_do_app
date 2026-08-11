let users = JSON.parse(localStorage.getItem('users')) || [
    { 'email': 'meinetestemail@gmail.com', 'password': 'test123' }
];

function addUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({ email: email.value, password: password.value });
    // weiterleitung zu login seite + Nachicht anzeigen "Erfolgreiche registrierung"
    window.location.href = '../login.html?msg=Du hast dich erfolgreich registriert'
}