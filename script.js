$("document").ready(function () {
  $("#weather").hide();
  $("#error").hide();

  if (navigator.geolocation) {
    var lat;
    var lon;

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon="+lon;
      $.getJSON(url, function(json) {
        var celcius = true;
        var tempC = json.main.temp;
        var tempF = tempC * 9 / 5 + 32;

        tempF = Number(tempF.toString().slice(0, 5));

        $("#loading").hide();
        $("#icon").attr("src", json.weather[0].icon);
        $("#main").html(json.weather[0].main);
        $("#description").html(json.weather[0].description);
        $("#location").html(json.name + ", " + json.sys.country);
        $("#temp").html(tempC + " &#x2103;");
        $("#changeUnit").html("Change to Farenheit");
        $("#changeUnit").on("click", function(){
          var button = this;
          if(celcius) {
            $("#temp").html(tempF + " &#x2109;");
            $("#changeUnit").val("Change to Celcius");
            celcius = false;
          } else {
            $("#temp").html(tempC + " &#x2103;");
            console.log($("#changeUnit").val());
            celcius = true;
          }
        });
        $("#weather").fadeIn("slow");
        console.log(json);
      });
    }, function(error){

      switch(error.code) {
        case error.PERMISSION_DENIED:
            showError("User denied the request for Geolocation.");
            break;

        case error.POSITION_UNAVAILABLE:
            showError("Your location information is unavailable.");
            break;

        case error.TIMEOUT:
            showError("The request to get your location timed out.");
            break;

        case error.UNKNOWN_ERROR:
            showError("An unknown error occurred.");
            break;
      }
    });
  } else {
    showError("Your browser does not support Geolocation!");
  }
});

function showError(error) {
    $("#loading").hide();
    $("h1").css("color", "red");
    $("#error").html(error);
    $("#error").fadeIn("slow");
}
