function calculate() {
  var zipcode = $('#zipcode').val();
  var days = '4'
  var url = '/api/' + zipcode + '/' + days + '/';
  $('#result-msg').html("Getting the lastest info...");
  $.ajax({
    url: url
  }).then(function(data){
    $('#result-msg').html("The chance you will have a snow day tomorrow is " + data.Percentage + "%");
  });

}
