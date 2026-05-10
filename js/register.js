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

function register(){
    let username = $('#username').val().trim();
    let email = $('#email').val().trim();
    let password = $('#password').val().trim();
    if(username === "" || email === "" || password === ""){
        $('#msg').html('<div class="error-box">All fields are required</div>');
        return;
    }
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.match(pattern)){
        $('#msg').html('<div class="error-box">Invalid email</div>');
        return;
    }
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if(!password.match(passPattern)){
        $('#msg').html('<div class="error-box">Password must be at least 12 characters with uppercase, lowercase, number and special character</div>');
        return;
    }
    $.ajax({
        url: './php/register.php',
        type: 'POST',
        data: {username, email, password},
        success: function(res){
            $('#msg').html(res);
            if(res.includes("Registered successfully")){
                setTimeout(function(){
                    window.location = "login.html";
                }, 2000);
            }
        },
        error: function(){
            $('#msg').html('<div class="error-box">Could not connect to server</div>');
        }
    });
}
