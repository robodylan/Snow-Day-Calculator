function calculate() {
  var zipcode = $('#zipcode').val();
  if($('#days').val() == "") {
    $('#days').val(0);
  }
  var days = $('#days').val();
  var url = '/api/' + zipcode + '/' + days + '/';
  $('#result-msg').html("Getting the lastest info...");
  $.ajax({
    url: url
  }).then(function(data){
    if(data.hasOwnProperty('Percentage') && data.Percentage != "%N/A") {
      $('#result-msg').html("The chance you will have a snow day tomorrow is " + data.Percentage + "%");
    }else {
      $('#result-msg').html("Error Processing Request: Invalid Zipcode");
    }
  });

}
