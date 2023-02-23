function validate(){
    let password = document.getElementById("pass");
    let user=document.getElementById("user");

    if(emailcheck(user.value)===true && password.value.length >= 8){
        alert("Login Succesfull");
        window.location.href="https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/"
    }
    else{
        alert("Login Failed");
    }


    function emailcheck(email){
        const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
}