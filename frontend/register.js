document.addEventListener("DOMContentLoaded", () => {
    session = getCookie('session');
    if (session) 
        window.location.href = 'index.html';  
    
});

document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    // Create user details object
    const userDetails = {
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
        weight,
        height
    };

    // Call API to register the user (replace this with your API call)
    const registeredUser = apiRegister(userDetails);
    if (registeredUser) {
        // Redirect to login or home page after successful registration
        window.location.href = 'login.html';
    } else {
        alert("Registration failed, please try again.");
    }
});

$(document).ready(function() {
    $('#gym-select-box').on('click', function() {
        $('#gym-options').toggleClass('open');
    });

    $('#gym-options .option').on('click', function() {
        var gymValue = $(this).data('value');
        var gymText = $(this).text();
        var selectedGym = `<span data-value="${gymValue}">${gymText}</span>`;
        
        $('#selected-gym').append(selectedGym);
        $(this).hide(); // Option is now selected and hidden
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.select-container').length) {
            $('#gym-options').removeClass('open');
        }
    });
});
