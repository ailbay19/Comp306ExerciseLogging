function apiLoginUser(params) {
  if (!params['username'])
    return 'Guest User';

  return params['username'];
}

function apiRegisterUser(params) {
  if (!params['username'])
    alert("no username");

  return params['username'];
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