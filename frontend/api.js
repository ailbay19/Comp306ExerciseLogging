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