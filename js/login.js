$(document).ready(function(){
    let sessionId = localStorage.getItem("sessionId");
    if(sessionId){
        $.ajax({
            url: './php/session_check.php',
            type: 'POST',
            data: {sessionId: sessionId},
            success: function(res){
                if(res === "valid"){
                    window.location = "profile.html";
                }
            }
        });
    }
});

function login(){
    let email = $('#email').val().trim();
    let password = $('#password').val().trim();
    if(email === "" || password === ""){
        $('#msg').html('<div class="error-box">All fields are required</div>');
        return;
    }
    $.ajax({
        url: './php/login.php',
        type: 'POST',
        data: {email, password},
        success: function(res){
            if(res.startsWith("success:")){
                let sessionId = res.split(":")[1];
                localStorage.setItem("user", email);
                localStorage.setItem("sessionId", sessionId);
                window.location = "profile.html";
            }
            else if(res === "not_found"){
                $('#msg').html('<div class="error-box">User not found</div>');
            }
            else if(res === "wrong_password"){
                $('#msg').html('<div class="error-box">Incorrect password</div>');
            }
        },
        error: function(){
            $('#msg').html('<div class="error-box">Could not connect to server</div>');
        }
    });
}
