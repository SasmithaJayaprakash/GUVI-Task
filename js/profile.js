$(document).ready(function () {

    let sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
        window.location = "index.html";
        return;
    }

    $.ajax({
        url: './php/session_check.php',
        type: 'POST',
        data: { sessionId },
        success: function (res) {

            if (res !== "valid") {
                localStorage.removeItem("sessionId");
                window.location = "index.html";
                return;
            }

            $.ajax({
                url: './php/get_profile.php',
                type: 'POST',
                data: { sessionId },
                success: function (res) {
                    try {
                        let data = JSON.parse(res);
                        if (data.status === 'success') {
                            if (data.age)     $('#age').val(data.age);
                            if (data.dob)     $('#dob').val(data.dob);
                            if (data.contact) $('#contact').val(data.contact);
                        }
                    } catch (e) {}
                }
            });

        }
    });

});

function updateProfile() {

    let sessionId = localStorage.getItem("sessionId");
    let age       = $('#age').val().trim();
    let dob       = $('#dob').val();
    let contact   = $('#contact').val().trim();

    if (age === "" || dob === "" || contact === "") {
        $('#msg').html('<div class="error-box">All fields are required</div>');
        return;
    }

    if (contact.length !== 10 || isNaN(contact)) {
        $('#msg').html('<div class="error-box">Contact must be 10 digits</div>');
        return;
    }

    $.ajax({
        url: './php/update_profile.php',
        type: 'POST',
        data: { sessionId, age, dob, contact },
        success: function (response) {
            $('#msg').html('<div class="alert alert-success">' + response + '</div>');
        },
        error: function () {
            $('#msg').html('<div class="error-box">Could not connect to server</div>');
        }
    });

}

function logout() {

    let sessionId = localStorage.getItem("sessionId");

    $.ajax({
        url: './php/logout.php',
        type: 'POST',
        data: { sessionId },
        success: function () {
            localStorage.removeItem("sessionId");
            window.location = "index.html";
        }
    });

}
