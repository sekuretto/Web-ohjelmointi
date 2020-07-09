function show_position() {
  // paris
  var latlon = new google.maps.LatLng(48.85341, 2.3488);
  var city = "Paris";
  console.log("show_position: latlon=" + latlon + " city=" + city);
  // Map
  var mapholder = document.getElementById("mapholder");
  mapholder.style.height = '250px';
  mapholder.style.width = '500px';
  var myOptions = {
    center: latlon,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    }
  };
  var map = new google.maps.Map(mapholder, myOptions);
  var marker = new google.maps.Marker({
    position: latlon,
    map: map,
    title: city
  });
}