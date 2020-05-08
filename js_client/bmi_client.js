$(document).ready((event)=>{
    $('#btn-calculBMI').click((event)=>{
        event.preventDefault();
        let weight = $('#ipt_weight').val();
        let height = $('#ipt_height').val()/100;
        let urlService = `http://192.168.0.28:8080/users/bmi_calculator?weight=${weight}&height=${height}`;
        
       $.ajax({
           url : urlService,
           type : 'GET',
           success: (res)=>{
               if(res.statut === 'KO'){
                    $('#resultBMI').html('<h3 style="color:red">'+JSON.stringify(res.data)+'</h3>');
                    $('#resImg').html('<img src="/corgi2.jpg" alt="pig" height="700" width="500">');
               }else{
                    $('#resultBMI').html('<h3 style="color:blue"> Cơ thể bạn: ' + JSON.stringify(res.data)+ '</h3>');
                        
                    let type = res.type;
                    if(type === '1'){
                        $('#resImg').html('<img src="/om.jpg" alt="pig" height="300" width="500">');
                      
                    }else if(type === '2'){
                        $('#resImg').html('<img src="/binhthuong.jpg" alt="pig" height="300" width="500">');   
                      
                    }else if(type === '3'){
                        $('#resImg').html('<img src="/beo.jpg" alt="pig" height="300" width="500">');
                        
                    }else if(type === '4'){
                        $('#resImg').html('<img src="/sieubeo.jpg" alt="pig" height="300" width="500">');        
                        
                    }
                    

               }        
           },

           error: (error)=>{
                alert('error: ' + error);
           }
       });
    });
});
