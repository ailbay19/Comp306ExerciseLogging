document.addEventListener("DOMContentLoaded", () => {
    session = getCookie('session')

    if (session)
        window.location.href = 'index.html'

});

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    params = { "username": username, "password": password };

    userDetails = apiLogin(params);
    if (!userDetails) {
        alert("no");
        return;
    }

    localStorage.setItem("userDetails", userDetails);
    window.location.href = 'index.html';
}

function register() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    params = { "username": username, "password": password };

    userDetails = apiRegister(params);
    if (!userDetails) {
        alert("no");
        return;
    }

    localStorage.setItem("userDetails", userDetails);
    window.location.href = 'index.html';
}