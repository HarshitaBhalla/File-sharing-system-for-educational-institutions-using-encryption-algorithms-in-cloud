window.onload = function() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
 }


 $(document).ready(function() {
    
    $('#teacherMsgSubmit').click(function(e){
        console.log("entered");
        e.preventDefault();
        var msg= $("#msg").val();
        console.log(msg);
        $.ajax({ 
            type: "POST",
            url: "/sendMsg",
            data: {msg: msg},
            error: function(e){
                toastr.error("Some Error occurred!")
            },
            success: function(response){
                $("#msg").val("");
               toastr.success('Message sent!');
            }
        });  
        return false;  
    }) 

 })