function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(user => user.email == email.value && user.password == password.value);
    if (user) {
        console.log("user gefunden");
        window.location.href = './todo.html';
    }
}

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

if (msg) {
    msgBox.innerHTML = msg;
    setTimeout(() => {
        const element = document.getElementById('msgBox');
        if (element) {
            element.remove();
        }
    }, 3000);
}

function loginAsGuest() {
    let guestEmail = document.getElementById('email');
    let guestPassword = document.getElementById('password');

    guestEmail.value = 'guestuser@web.com';
    guestPassword.value = 'myGuests123';
    login();
}

let facebookSignIn = document.getElementById('facebook');
facebookSignIn.addEventListener('click', () => {
    window.location.href = 'https://www.facebook.com';
});

let githubSignIn = document.getElementById('github');
githubSignIn.addEventListener('click', () => {
    window.location.href = 'https://www.github.com';
});

let googleSignIn = document.getElementById('google');
googleSignIn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
});
