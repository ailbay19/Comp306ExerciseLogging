

// Gym ve Trainer Seçimi
$("#gym-trainer-form").submit(function (event) {
    event.preventDefault();

    var gym = $("#gym").val();
    var trainer = $("#trainer").val();

    // Gym ve Hoca Seçimi Yapıldıktan Sonra, Bu Bölüm Kapanacak
    $("#gym-trainer-form").hide();

    // Egzersiz Filtreleme Bölümünü Göster
    $("#exercise-filter-form").show();
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
    $("#exercise-list").html("");
    filteredExercises.forEach((exercise) => {
        $("#exercise-list").append(`
        <div class="card mb-3 exercise-card" data-exercise="${exercise.name}">
            <div class="card-body d-flex justify-content-between">
                <h5 class="card-title">${exercise.name}</h5>
                <button class="btn btn-primary select-exercise btn-xs" data-exercise="${exercise.name}">Seç</button>
            </div>
        </div>
    `);
    });

    $("#exercise-entry-form").show();
});

// Egzersiz Seçimi
$(document).on("click", ".select-exercise", function () {
    var exerciseName = $(this).data("exercise");

    // Egzersiz bilgilerini göster
    var selectedExercise = exercises.find((ex) => ex.name === exerciseName);
    $("#exercise-entry-form").data("exercise", selectedExercise.name); // Egzersiz adını sakla

    // Geçmiş performanslar bölümünü güncelle ve göster
    $("#exercise-history").show();
    $("#history-list").html("");
    if (selectedExercise.history.length > 0) {
        selectedExercise.history.forEach((entry) => {
            $("#history-list").append(`
            <div class="history-item">
                <strong>Ağırlık:</strong> ${entry.weight}kg, <strong>Setler:</strong> ${entry.sets}, <strong>Tekrarlar:</strong> ${entry.reps}
            </div>
        `);
        });
    } else {
        $("#history-list").html(
            "<p>Bu egzersiz için geçmiş performans kaydı bulunmamaktadır.</p>"
        );
    }

    // Ağırlık, set, tekrar giriş formunu göster
    $("#exercise-entry-details").show();

    // Performans Karşılaştırma bölümünü güncelle ve göster
    $("#comparison-section").show();
    $("#comparison-section tbody").html(""); // Eski veriyi temizle
    exercises.forEach((ex) => {
        if (ex.name === exerciseName && ex.history.length > 0) {
            ex.history.forEach((entry) => {
                $("#comparison-section tbody").append(`
                <tr>
                    <td>Me (Ben)</td>
                    <td>${entry.weight}</td>
                    <td>${entry.sets}</td>
                    <td>${entry.reps}</td>
                </tr>
            `);
            });
        }
    });
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

    // "Günün Antremanına" ekle
    $("#saved-exercises-list").append(`
    <li class="list-group-item">
        <strong>${selectedExercise.name}</strong>: ${weight}kg, ${sets} Set, ${reps} Tekrar
    </li>
`);

    // Formu temizle
    $("#exercise-form")[0].reset();
    $("#exercise-entry-details").hide(); // Egzersiz giriş formunu gizle
});