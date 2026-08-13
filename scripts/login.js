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
} else {
    // display:none;
}