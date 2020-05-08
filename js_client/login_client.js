$(document).ready((evt)=>{
    $('#btn-login').click((evt)=>{

        const username = $('#ipt_username').val();
        const password = $('#ipt_password').val();
        const urlCall = `http://192.168.0.28:8080/users/login/`;
        const loginSucess_tpl = `http://192.168.0.28:8080/users/loginSuccess_tpl/`;

        $.ajax({
            url : urlCall,
            type : 'POST',
            dataType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : {username, password},
           
            success : (res)=>{
                if(res.result === 'OK'){
                    window.location.href = loginSucess_tpl;
                }else{
                    alert('Username/Passowrds incorrects !');
                }
            },
            error : (error)=>{
                alert(JSON.stringify(error));   
            }
        });
    })

});

