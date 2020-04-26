$(document).ready((event)=>{
    $('#btn-calculBMI').click((event)=>{
        event.preventDefault();
        let weight = $('#ipt_weight').val();
        let height = $('#ipt_height').val()/100;
        let urlService = `http://localhost:8080/users/bmi_calculator?weight=${weight}&height=${height}`;
        
       $.ajax({
           url : urlService,
           type : 'GET',

           success: (data)=>{
               $('#resultBMI').text('Cơ thể bạn: ' + JSON.stringify(data));
           },

           error: (error)=>{
                alert('error: ' + error);
           }
       });
    });
});