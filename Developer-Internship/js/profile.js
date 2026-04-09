function updateProfile(){
let email=localStorage.getItem("user");
let age=$('#age').val().trim();
let dob=$('#dob').val().trim();
let contact=$('#contact').val().trim();

if(age===""||dob===""||contact===""){
alert("All fields required");
return;
}

$.ajax({
url:'./php/update_profile.php',
type:'POST',
data:{email,age,dob,contact},
success:function(res){
alert(res);
},
error:function(){
alert("Could not connect to server");
}
});
}