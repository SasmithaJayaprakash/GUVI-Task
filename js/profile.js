$(document).ready(function(){
    let sessionId = localStorage.getItem("sessionId");
    let email = localStorage.getItem("user");
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
            }
        },
        error: function(){
            window.location = "login.html";
        }
    });
});

function updateProfile(){
    let email = localStorage.getItem("user");
    let age = $('#age').val().trim();
    let dob = $('#dob').val().trim();
    let contact = $('#contact').val().trim();
    if(age === "" || dob === "" || contact === ""){
        alert("All fields required");
        return;
    }
    $.ajax({
        url: './php/update_profile.php',
        type: 'POST',
        data: {email, age, dob, contact},
        success: function(res){
            alert(res);
        },
        error: function(){
            alert("Could not connect to server");
        }
    });
}

function logout(){
    let sessionId = localStorage.getItem("sessionId");
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
