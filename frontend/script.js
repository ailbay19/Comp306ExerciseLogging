document.addEventListener("DOMContentLoaded", () => {
    session = getCookie('session');
    if (session === "") {
        window.location.href = 'login.html'
        return
    }

    $(".username").text(session);
    populateSpecialLeaderboard();
});

// Gym ve Trainer Seçimi
$("#gym-trainer-form").submit(function (event) {
    event.preventDefault();

    var gym = $("#gym").val();
    var trainer = $("#trainer").val();

    $("#collapseOne").collapse("hide");
    $("#collapseTwo").collapse("show");
    // Egzersiz Filtreleme Bölümünü Göster
    $("#exercise-filter-form").show();



    // "End Workout" butonunu görünür yap
    $("#finish-workout-btn").show();
});

// Egzersiz Filtreleme
$("#exercise-filter").submit(function (event) {
    event.preventDefault();

    var targetMuscle = $("#target-muscle").val();
    var level = $("#level").val();
    var equipment = $("#equipment").val();

    params = {};
    exercises = apiFetchExercises(params);

    // Egzersizleri filtrele
    var filteredExercises = exercises.filter((exercise) => {
        return (
            (!targetMuscle || exercise.target_muscle === targetMuscle) &&
            (!level || exercise.level === level) &&
            (!equipment || exercise.needed_equipment === equipment)
        );
    });

    // Filtrelenmiş egzersizleri listele
    populateExercises(filteredExercises);

    $("#exercise-entry-form").show();
    $("#collapseTwo").collapse("hide");
    $("#collapseThree").collapse("show");

});

// Egzersiz Seçimi
$(document).on("click", ".select-exercise", function () {
    var exerciseName = $(this).data("exercise");

    // Egzersiz bilgilerini göster
    var selectedExercise = exercises.find((ex) => ex.name === exerciseName);
    $("#exercise-entry-form").data("exercise", selectedExercise.name); // Egzersiz adını sakla

    // Geçmiş performanslar bölümünü güncelle ve göster
    populatePastPerformances(selectedExercise);

    // Ağırlık, set, tekrar giriş formunu göster
    $("#exercise-entry-details").show();
    console.log("HIHIHI");
    // Performans Karşılaştırma bölümünü güncelle ve göster
    populateComparison(selectedExercise);

    $("#collapseThree").collapse("hide");
    $("#collapseFour").collapse("show");

    $("#exercise-history").show();
    $("comparison-section").show();
});

// Egzersiz Kaydet
$("#exercise-form").submit(function (event) {
    event.preventDefault();

    var selectedExerciseName = $("#exercise-entry-form").data("exercise");
    var selectedExercise = exercises.find(
        (ex) => ex.name === selectedExerciseName
    );
    var weight = $("#weight").val();
    var sets = $("#sets").val();
    var reps = $("#reps").val();

    // Kaydedilen egzersiz bilgisini egzersizin geçmişine ekle
    selectedExercise.history.push({ weight, sets, reps });

    params = {
        "workout_id": null, // TODO: setup workout generation?
        "exercise_name": selectedExerciseName,
        "weight": weight,
        "sets": sets,
        "reps": reps
    };
    apiPostExercise(params);
    appendWorkoutData(params); // Add to todays workout


    // Formu temizle
    $("#exercise-form")[0].reset();
    $("#exercise-entry-details").hide(); // Egzersiz giriş formunu gizle

    $("#collapseThree").collapse("show");
    $("#collapseFour").collapse("hide");
});


function populateExercises(exercises) {
    if (exercises == null) {
        exercises = apiFetchExercises();
    }

    $("#exercise-list").html("");
    exercises.forEach((exercise) => {
        $("#exercise-list").append(`
        <div class="card mb-3 exercise-card" data-exercise="${exercise.name}">
            <div class="card-body d-flex justify-content-between">
                <h5 class="card-title">${exercise.name}</h5>
                <button class="btn btn-primary select-exercise btn-xs" data-exercise="${exercise.name}">Choose</button>
            </div>
        </div>
    `);
    });
}

function populatePastPerformances(exerciseObject) {
    $("#history-list").html("");
    if (exerciseObject.history.length > 0) {
        exerciseObject.history.forEach((entry) => {
            $("#history-list").append(`
            <div class="history-item">
                <strong>Weight:</strong> ${entry.weight}kg, <strong>Sets:</strong> ${entry.sets}, <strong>Reps:</strong> ${entry.reps}
            </div>
        `);
        });
    } else {
        $("#history-list").html(
            "<p>There is no track record for this exercise.</p>"
        );
    }
}

// TODO: change this to leaderboard, fetch from api call. current user doesn't have comparison data.
function populateComparison(selectedExercise) {
    $("#comparison-section").show();
    params['exercise_name'] = selectedExercise.name;
    leadData = apiFetchLeaderboard(params);
    leadData.forEach((data) => {
        row = `<tr>`;
        data.forEach((value) => {
            row += `<td>${value}</td>`; // Add each value in a new <td>
        });
        row += `</tr>`;
        $("#comparison-section tbody").append(row);
    });
    return null;
}

function populateSpecialLeaderboard() {
    leadData = apiFetchLeaderboard2();
    leadData.forEach((data) => {
        row = `<tr>`;
        data.forEach((value) => {
            row += `<td>${value}</td>`; // Add each value in a new <td>
        });
        row += `</tr>`;
        $("#leaderboard2 tbody").append(row);
    });
    return null;
}

function appendWorkoutData(params) {
    $("#saved-exercises-list").append(`
        <li class="list-group-item">
            <strong>${params['exercise_name']}</strong>: ${params['weight']}kg, ${params['sets']} Sets, ${params['reps']} Reps
        </li>
    `);
}
