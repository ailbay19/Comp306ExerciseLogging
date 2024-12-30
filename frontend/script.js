
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

    // Populate Gyms Table
    const tableBody = document.querySelector('#gyms-table tbody');
    tableBody.innerHTML = ''; // clear data before populating

    gyms.forEach(gym => {
        row = document.createElement('tr');

        cell = document.createElement('td');
        cell.textContent = gym.id; 
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.textContent = gym.name;
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.textContent = gym.location;
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.textContent = gym.price;
        row.appendChild(cell);

        tableBody.appendChild(row);
    });
}

function handleExercises(page){
    exercises = apiFetchExercises();
}

function handlePerformances(page){
    performances = apiFetchPerformances();
}

function handleLeaderboardSelectGym(){
    selectedExercise = document.getElementById('leaderboard-selected-exercise').value;
    console.log(selectedExercise);
    
    // Show or hide table
    if(selectedExercise == ''){
        document.getElementById('gym-leaderboard-table').style.display = 'none';
        return;
    }
    
    document.getElementById('gym-leaderboard-table').style.display = '';

    // Handle table population
    params = {"gym": "user-gym", "exercise": selectedExercise}
    leaderboard = apiFetchLeaderboard(params);


    const tableBody = document.querySelector('#gym-leaderboard-table tbody');
    tableBody.innerHTML = ''; // clear data before populating

    leaderboard.forEach(user => {
        const row = document.createElement('tr');
  
        cell = document.createElement('td');
        cell.textContent = user.rank; 
        row.appendChild(cell);
  
        cell = document.createElement('td');
        cell.textContent = user.username;
        row.appendChild(cell);
  
        cell = document.createElement('td');
        cell.textContent = user.value1;
        row.appendChild(cell);
  
        cell = document.createElement('td');
        cell.textContent = user.value2;
        row.appendChild(cell);
  
        tableBody.appendChild(row);
      });
}