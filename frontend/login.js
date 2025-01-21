document.addEventListener("DOMContentLoaded", () => {
    session = getCookie('session');

    if (session)
        window.location.href = 'index.html'

});

function login() {
    email = document.getElementById("login-username").value;
    password = document.getElementById("login-password").value;

    params = { "email": email, "password": password };

    userDetails = apiLogin(params);
    if (!userDetails) {
        alert("wrong email password")
        return;
    }

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    window.location.href = 'index.html';
}
