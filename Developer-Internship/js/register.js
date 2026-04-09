function register(){
let username=$('#username').val().trim();
let email=$('#email').val().trim();
let password=$('#password').val().trim();

if(username===""||email===""||password===""){
$('#msg').html('<div class="error-box">All fields are required</div>');
return;
}

let pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
if(!email.match(pattern)){
$('#msg').html('<div class="error-box">Invalid email</div>');
return;
}

if(password.length<6){
$('#msg').html('<div class="error-box">Password must be at least 6 characters</div>');
return;
}

$.ajax({
url:'./php/register.php',
type:'POST',
data:{username,email,password},
success:function(res){
$('#msg').html(res);
},
error:function(){
$('#msg').html('<div class="error-box">Could not connect to server</div>');
}
});
}