$('#phone01').keyup(function(e){

  alert($("#phone01").val());
  
if ($("#phone01").val().length == 40) {
			$.ajax({
				url: "ajax/test.php",
				data: {name:$("#name01"), 'phone':$("#phone01")},
				type: "POST",
				
			});
};
		})