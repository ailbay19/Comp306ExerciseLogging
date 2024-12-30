
document.addEventListener("DOMContentLoaded", () => {
    handleNavigation('home');
});

const pages = {
    'login':document.getElementById("login-container"),
    'home':document.getElementById("home-container"),
    'gym':document.getElementById("gym-container"),
    'workout':document.getElementById("workout-container"),
    'exercise':document.getElementById("exercise-container"),
    'performance':document.getElementById("performance-container"),
    'profile':document.getElementById("profile-container"),
}

function handleNavigation(page) {
    // Hide all pages
    for (let key in pages) {
        if(!pages[key])
            continue;
        pages[key].style.display = 'none';
    }

    // force login
    const session = localStorage.getItem('session');
    if(!session){
        pages['login'].style.display = 'block';
        return;
    }

    // If match a page, show it
    if(pages[page]){
        pages[page].style.display = 'block';
    }

    handleReferences(page);
}

function handleLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const data = {"username": username, "password": password};

    const session = apiLoginUser(data);

    if(session) {
        localStorage.setItem("session", session);
    }

    handleNavigation('home');
}

function handleRegister() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const data = {"username": username, "password": password};

    const session = apiRegisterUser(data);

    handleLogin();
}

function handleLogout() {
    localStorage.removeItem("session");
    handleNavigation('login');
}

function getUsername() {
    session = localStorage.getItem('session');

    if(session){
        return session;
    }
}

function handleReferences(page){
    handleUsernameReferences();
    handleGyms(page);
    handleExercises(page);
    handlePerformances(page);
}

function handleUsernameReferences() {
    username = getUsername();

    document.querySelector('.username-text').textContent = username;
}

function handleGyms(page){
    gyms = apiFetchGyms();
}

function handleExercises(page){
    exercises = apiFetchExercises();
}

function handlePerformances(page){
    performances = apiFetchPerformances();
}