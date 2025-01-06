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
  if (!params['username'])
    params['username'] = 'Guest User';

  userDetails = { "username": params["username"] };

  setCookie("session", userDetails['username'])
  return userDetails;
}

function apiRegister(params) {
  if (!params['username']) {
    alert("no username");
    return;
  }

  userDetails = { "username": params["username"] };

  setCookie("session", userDetails['username'])
  return userDetails;
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
  // params = {"gym": "user-gym", "exercise": selectedExercise}
  const leaderboardData = [
    {
      "rank": 1,
      "username": "user1",
      "value1": "100kg",
      "value2": "120 reps?"
    },
    {
      "rank": 2,
      "username": "user2",
      "value1": "30kg",
      "value2": "120 reps?"
    },
    {
      "rank": 3,
      "username": "Gym C",
      "value1": "20kg",
      "value2": "120 reps?"
    }
  ];

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