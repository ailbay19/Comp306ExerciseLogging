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

function apiFetchGyms(){
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

function apiFetchExercises() {
    return null;
}

function apiFetchPerformances() {
    return null;
}