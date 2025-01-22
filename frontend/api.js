apiUrl = ''

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function clearCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function apiLogin(params) {
  email = params['email'];
  password = params['password'];

  if (!email || !password) {
    console.error("Email and password are required for login.");
    return null;
  }

  url = `${apiUrl}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);

  try {
    xhr.send();

    if (xhr.status === 200) {
      response = JSON.parse(xhr.responseText);

      if (response.message === "Login successful") {
        userDetails = response.user;

        setCookie("session", userDetails.email);

        return userDetails;
      } else {
        console.error(response.message || "Login failed.");
        return null;
      }
    } else {
      console.error(`Failed to fetch login endpoint. Status: ${xhr.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}



function apiRegister(userDetails) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", apiUrl + "/register", false);
  xhr.setRequestHeader("Content-Type", "application/json");

  try {
    xhr.send(JSON.stringify({
      email: userDetails.email,
      password: userDetails.password,
      fname: userDetails.firstName,
      lname: userDetails.lastName,
      age: parseInt(userDetails.age),
      gender: userDetails.gender,
      weight: parseFloat(userDetails.weight),
      height: parseFloat(userDetails.height),
    }));

    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response.message);

      setCookie("session", userDetails.email);

      return userDetails;
    } else {
      console.error("Registration failed:", xhr.responseText);
      return null;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return null;
  }
}


function apiLogout() {
  clearCookie('session');
}

function apiFetchGyms(params) {
  const gymsData = [
    {
      "id": 1,
      "name": "Gym A",
      "location": "New York",
      "price": "$50/month"
    },
    {
      "id": 2,
      "name": "Gym B",
      "location": "Los Angeles",
      "price": "$60/month"
    },
    {
      "id": 3,
      "name": "Gym C",
      "location": "Chicago",
      "price": "$45/month"
    }
  ];

  return gymsData;
}

function apiFetchLeaderboard(params) {
  const xhr = new XMLHttpRequest();

  queryString = new URLSearchParams(params).toString();
  url = `${apiUrl}/top_users_at_certain_exercise?${queryString}`;

  xhr.open("GET", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  try {
    xhr.send();

    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      leaderboard = response.top_exercises.map(exercise => ({
        user_id: exercise[0],
        age: exercise[1],
        gender: exercise[2],
        weight: exercise[3],
        height: exercise[4],
        total_weight_lifted: exercise[5],
        avg_sets: exercise[6],
        avg_reps: exercise[7]
      }));
      return response.top_exercises;
    } else {
      console.error("Registration failed:", xhr.responseText);
      return null;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return null;
  }

  return leaderboardData;
}

function apiFetchLeaderboard2(params) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl + "/top_users_at_certain_exercise2", false);
  xhr.setRequestHeader("Content-Type", "application/json");

  try {
    xhr.send();

    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      return response.top_exercises;
    } else {
      console.error("Registration failed:", xhr.responseText);
      return null;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return null;
  }

  return leaderboardData;
}

function apiFetchExercises(params) {
  const exercises = [
    {
      name: "Squat",
      target_muscle: "Legs",
      level: "Beginner",
      needed_equipment: "None",
      history: [],
    },
    {
      name: "Bench Press",
      target_muscle: "Chest",
      level: "Intermediate",
      needed_equipment: "Barbell",
      history: [],
    },
    {
      name: "Pull-up",
      target_muscle: "Back",
      level: "Advanced",
      needed_equipment: "Pull-up Bar",
      history: [],
    },
    {
      name: "Bicep Curl",
      target_muscle: "Arms",
      level: "Beginner",
      needed_equipment: "Dumbbell",
      history: [],
    },
    {
      name: "Shoulder Press",
      target_muscle: "Shoulders",
      level: "Intermediate",
      needed_equipment: "Dumbbell",
      history: [],
    },
    {
      name: "Deadlift",
      target_muscle: "Legs",
      level: "Advanced",
      needed_equipment: "Barbell",
      history: [],
    },
  ];
  return exercises;
}

function apiFetchPerformances(params) {
  return null;
}

function apiPostExercise(params) {
  return null;
}