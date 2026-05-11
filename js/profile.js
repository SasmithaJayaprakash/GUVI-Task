$(document).ready(function(){
    var sessionId = localStorage.getItem("sessionId");
    var email = localStorage.getItem("user");
    if(!sessionId || !email){
        window.location = "login.html";
        return;
    }
    $.ajax({
        url: './php/session_check.php',
        type: 'POST',
        data: {sessionId: sessionId},
        success: function(res){
            if(res !== "valid"){
                localStorage.removeItem("user");
                localStorage.removeItem("sessionId");
                window.location = "login.html";
            } else {
                loadProfile(email);
            }
        },
        error: function(){
            window.location = "login.html";
        }
    });
});

function loadProfile(email){
    $.ajax({
        url: './php/get_profile.php',
        type: 'POST',
        data: {email: email},
        success: function(res){
            var data = JSON.parse(res);
            if(data.length > 0){
                $('#age').val(data[0].age);
                $('#dob').val(data[0].dob);
                $('#contact').val(data[0].contact);
            }
        }
    });
}

function formatDob(){
    var val = $('#dob').val().replace(/\D/g, '');
    var result = '';
    if(val.length > 0) result = val.substring(0,2);
    if(val.length >= 2) result = val.substring(0,2) + '-' + val.substring(2,4);
    if(val.length >= 4) result = val.substring(0,2) + '-' + val.substring(2,4) + '-' + val.substring(4,8);
    $('#dob').val(result);
}

function updateProfile(){
    var email = localStorage.getItem("user");
    var age = $('#age').val().trim();
    var dob = $('#dob').val().trim();
    var contact = $('#contact').val().trim();
    if(age === "" || dob === "" || contact === ""){
        alert("All fields required");
        return;
    }
    $.ajax({
        url: './php/update_profile.php',
        type: 'POST',
        data: {email:email, age:age, dob:dob, contact:contact},
        success: function(res){
            alert(res);
            loadProfile(email);
        },
        error: function(){
            alert("Could not connect to server");
        }
    });
}

function logout(){
    var sessionId = localStorage.getItem("sessionId");
    $.ajax({
        url: './php/logout.php',
        type: 'POST',
        data: {sessionId: sessionId},
        success: function(){
            localStorage.removeItem("user");
            localStorage.removeItem("sessionId");
            window.location = "login.html";
        }
    });
}
