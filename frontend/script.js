
document.addEventListener("DOMContentLoaded", () => {
    const session = localStorage.getItem("session");

    if (session) {
        hideLoginContainer();
        showUserContainer();
    } else {
        showLoginContainer();
        hideUserContainer();
    }
});

function hideLoginContainer(){
    document.getElementById("login-container").style.display = "none"
    document.getElementById("navbar-logout").style.display = "block"
}

function showLoginContainer() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("navbar-logout").style.display = "none";
}

function hideUserContainer(){
    document.getElementById("user-container").style.display = "none";
}

function showUserContainer() {
    document.getElementById("user-container").style.display = "block";
    document.getElementById("user-container-header").textContent = localStorage.getItem("session");
}

function apiLoginUser(data) {
    if(!data['username'])
        return 'Guest User';

    return data['username'];
}

function apiRegisterUser(data) {
    if(!data['username'])
        alert("no username");

    return data['username'];
}

function handleLogin(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {"username": username, "password": password};

    const session = apiLoginUser(data);

    if(session) {
        localStorage.setItem("session", session);
    }

    window.location.href = "index.html";
}

function handleRegister(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {"username": username, "password": password};

    const session = apiRegisterUser(data);

    if(session) {
        localStorage.setItem("session", session);
    }

    window.location.href = "index.html";
}

function handleLogout() {
    localStorage.removeItem("session");
}
