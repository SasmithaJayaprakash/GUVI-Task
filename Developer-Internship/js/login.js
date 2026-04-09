function login(){
let email=$('#email').val().trim();
let password=$('#password').val().trim();

if(email===""||password===""){
$('#msg').html('<div class="error-box">All fields are required</div>');
return;
}

$.ajax({
url:'./php/login.php',
type:'POST',
data:{email,password},
success:function(res){
if(res==="success"){
localStorage.setItem("user",email);
window.location="profile.html";
}
else if(res==="not_found"){
$('#msg').html('<div class="error-box">User not found</div>');
}
else if(res==="wrong_password"){
$('#msg').html('<div class="error-box">Incorrect password</div>');
}
},
error:function(){
$('#msg').html('<div class="error-box">Could not connect to server</div>');
}
});
}